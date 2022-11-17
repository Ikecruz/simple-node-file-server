const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 5000

const serveStaticFiles = (res, path, contentType, responseCode = 200) => {

    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('500 - Internal Server Error')
        }
        res.writeHead(responseCode, { 'Content-Type': contentType })
        res.end(data)
    })

}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    res.writeHead(200, { 'Content-Type': 'text/plain' })

    switch(path){
        case '':
            serveStaticFiles(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFiles(res, '/public/about.html', 'text/html')
            break
        case '/img/logo.jpeg':
            serveStaticFiles(res, '/public/img/logo.jpeg', 'image/png')
            break
        default:
            serveStaticFiles(res, '/public/404.html', 'text/html')
            break
    }
})

server.listen(port, () => console.log(`Server started on port ${port};\n` + 'Press Ctrl+C to to terminate'))