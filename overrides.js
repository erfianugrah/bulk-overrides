addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const origin = [
    override_variables.get("home"),  
    override_variables.get("net"),
    override_variables.get("ml")
]

const resolve = origin.find( ({ incoming_path }) => newRequest.pathname.match(incoming_path)) ?? {}

const subRequest = new Request(request)
subRequest.host = resolve.new_host
subRequest.pathname = ''

/*
const newResponse = await fetch(newRequest, 
    { cf:  { resolveOverride: resolve.new_host }} ) 
*/
const response = new Response(newRequest.body, newRequest)
response.headers.set('debug-1', JSON.stringify(resolve))
response.headers.set('debug-2', JSON.stringify(resolve.new_host))

return response
}