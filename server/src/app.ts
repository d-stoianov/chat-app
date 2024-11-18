import * as http from 'http'

const PORT = 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    res.write('server is live')
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`)
})
