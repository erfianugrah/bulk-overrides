addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const origin = [
    { 'new_host': 'home.erfianugrah.best', 'incoming_path': '/home', 'incoming_port': 1234 }
    /*await override_variables.get("home"),  
    await override_variables.get("net"),
    await override_variables.get("ml")*/
]

const resolve = origin.find( ({ incoming_path }) => newRequest.pathname == incoming_path) ?? {}

newRequest.host = resolve.new_host
newRequest.pathname = ''

/*
const newResponse = await fetch(request, 
    { cf:  { resolveOverride: resolve.new_host }} ) 
*/

const response = new Response(newRequest.body, newRequest)
response.headers.set('debug-1', JSON.stringify(resolve))
response.headers.set('debug-2', JSON.stringify(resolve.new_host))

return response
}