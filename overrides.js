addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const origin = [
    { 'new_host': 'home.erfianugrah.best', 'incoming_path': '/home', 'incoming_port': 1234 },
    { 'new_host': 'www.erfianugrah.net', 'incoming_path': '/net', 'incoming_port': 1234 },
    { 'new_host': 'www.erfi.ml', 'incoming_path': '/ml', 'incoming_port': 1234 },
    { 'new_host': 'www.google.com', 'incoming_path': '/google', 'incoming_port': 1234 },
    { 'new_host': 'http.erfianugrah.com', 'incoming_path': '/http', 'incoming_port': 1234 },
]

const resolve = origin.find( ({ incoming_path }) => newRequest.pathname === incoming_path) ?? {}

newRequest.hostname = resolve.new_host
newRequest.pathname = ''

const newResponse = await fetch(request, 
    { cf:  { resolveOverride: resolve.new_host }} ) 

const response = new Response(newResponse.body, newResponse)
response.headers.set('debug-1', JSON.stringify(resolve))
response.headers.set('debug-2', JSON.stringify(newRequest.hostname))
response.headers.set('debug-3', JSON.stringify(newRequest.pathname))

return response
}