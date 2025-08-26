const { exec } = require('child_process');
const os = require('os');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const PING_TIMEOUT = 1000; // 1 second per ping
const ARP_TIMEOUT = 1000; // 1 second for ARP lookup
const NSLOOKUP_TIMEOUT = 1000; // 1 second for hostname lookup
const PARALLEL_LIMITS = {
  ping: 50, // Max parallel pings
  details: 10 // Max parallel detail lookups
};

// Timeout wrapper for promises
function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    )
  ]);
}

// Native ping implementation
async function pingIP(ip) {
  const platform = os.platform();
  const command = platform === 'win32' 
    ? `ping -n 1 -w ${PING_TIMEOUT} ${ip}`
    : `ping -c 1 -W 1 ${ip}`;

  try {
    await withTimeout(execPromise(command), PING_TIMEOUT);
    return { ip, reachable: true };
  } catch {
    return { ip, reachable: false };
  }
}

// MAC address lookup
async function getMACAddress(ip) {
  try {
    const platform = os.platform();
    const command = platform === 'win32' 
      ? `arp -a ${ip}`
      : `arp -n ${ip}`;
    
    const { stdout } = await withTimeout(execPromise(command), ARP_TIMEOUT);
    const macRegex = /(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))/;
    const match = stdout.match(macRegex);
    return match ? match[0] : 'Unknown';
  } catch {
    return 'Unknown';
  }
}

// Hostname resolution
async function getHostname(ip) {
  try {
    const { stdout } = await withTimeout(execPromise(`nslookup ${ip}`), NSLOOKUP_TIMEOUT);
    const match = stdout.match(/name = (.+)\./);
    return match ? match[1] : ip;
  } catch {
    return ip;
  }
}

// Batch processor with parallel limit
async function processInBatches(items, processFn, batchSize) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(batch.map(item => 
      processFn(item).catch(e => ({ error: e.message }))
    ));
    results.push(...batchResults.map(r => r.value || r.reason));
  }
  return results;
}

// Network scanner
async function scanNetwork(range) {
  const baseIP = range.split('.')[0] + '.' + 
               range.split('.')[1] + '.' + 
               range.split('.')[2];
  
  console.log(`Scanning ${baseIP}.0/24 network...`);

  // Generate all IPs to scan
  const ips = Array.from({length: 254}, (_, i) => `${baseIP}.${i+1}`);

  // First pass: Fast ping scan
  const pingResults = await processInBatches(ips, pingIP, PARALLEL_LIMITS.ping);
  const reachableIPs = pingResults.filter(r => r.reachable).map(r => r.ip);

  // Second pass: Gather details
  const devices = [];
  const detailResults = await processInBatches(
    reachableIPs, 
    async (ip) => {
      try {
        const [mac, hostname] = await Promise.all([
          getMACAddress(ip),
          getHostname(ip)
        ]);
        return { ip, mac, hostname, status: 'Online' };
      } catch {
        return { ip, mac: 'Unknown', hostname: ip, status: 'Unresponsive' };
      }
    },
    PARALLEL_LIMITS.details
  );

  return detailResults.filter(Boolean);
}

// Main function
async function main() {
  try {
    const ranges = getLocalIPRange();
    
    if (ranges.length === 0) {
      console.log('No network interfaces found.');
      return;
    }

    console.log('Starting network scan...');
    
    for (const range of ranges) {
      const startTime = Date.now();
      const devices = await scanNetwork(range);
      const scanTime = ((Date.now() - startTime)/1000).toFixed(2);
      
      console.log(`\nScan completed in ${scanTime} seconds`);
      console.log('Discovered devices:');
      
      if (devices.length > 0) {
        console.table(devices);
      } else {
        console.log('No devices found in this range.');
      }
    }
  } catch (err) {
    console.error('Scan error:', err);
  }
}

// Helper function to get local IP ranges
function getLocalIPRange() {
  const interfaces = os.networkInterfaces();
  const ranges = [];

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.internal || net.family !== 'IPv4') continue;
      const parts = net.address.split('.');
      ranges.push(`${parts[0]}.${parts[1]}.${parts[2]}.0/24`);
    }
  }

  return ranges;
}

main();
