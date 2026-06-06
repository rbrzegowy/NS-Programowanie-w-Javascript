let port
const clients = []

console.log('[SharedWorker] context:', { ' this': this, navigator })
self.onconnect = (e) => {
    const port = e.ports[0]
    clients.push(port)
    console.log('[SharedWorker] New client connected', { port, clients })
    port.onmessage = function (e) {
        console.log('[SharedWorker] Message from client:', e, this);
        port.postMessage(`Typed: ${e.data}, current this.i = ${this.i}`)
        if (e.data === 'terminate') {
            // debugger
            this.close()
        }
        if (e.data === 'close') {
            console.log('Closing connection with client', { port, clients })
            port.close()
        }
    }
    port.start()
}

licznik()
function licznik() {
    const hash = (Math.random() * 10000).toFixed()
    let i = 0
    setInterval(() => {
        i++
        postMessageToAll('from shared: ' + hash + '-' + i)
    }, 1000)
}

function postMessageToAll(message) {
    for (const client of clients) {
        client.postMessage(message + ", clients connected: " + clients.length)
    }
}