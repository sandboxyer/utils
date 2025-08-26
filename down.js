const fs = require('fs');
const http = require('http');
const path = require('path');
const os = require('os');
const mime = require('mime');

// Get local network IP
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const details of iface) {
            if (details.family === 'IPv4' && !details.internal) {
                return details.address;
            }
        }
    }
    return 'localhost';
};

const localIP = getLocalIP();
const PORT = 3000;
const DIRECTORY = __dirname;

const server = http.createServer((req, res) => {
    const requestedPath = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(DIRECTORY, requestedPath);
    
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
    }

    if (fs.statSync(filePath).isDirectory()) {
        const files = fs.readdirSync(filePath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Index of ${requestedPath}</h1><ul>` +
            files.map(file => `<li><a href="${path.join(requestedPath, file)}">${file}</a></li>`).join('') +
            '</ul>');
        return;
    }

    const contentType = mime.getType(filePath) || 'application/octet-stream';
    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`
    });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running. Access your files at:`);
    console.log(`http://${localIP}:${PORT}/`);
    console.log(`Use wget to download files:`);
    console.log(`wget http://${localIP}:${PORT}/yourfile.json`);
});
