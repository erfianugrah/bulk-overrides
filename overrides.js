addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const origin = [
    await override_variables.get("home"),  
    await override_variables.get("net"),
    await override_variables.get("ml")
]

const resolve = origin.find( ({ incoming_path }) => newRequest.pathname.match(incoming_path)) ?? {}

newRequest.host = resolve.new_host
newRequest.pathname = ''

let response = await fetch(newRequest, 
    { cf:  {resolveOverride: resolve.new_host }} ) 

const response = new Response(response.body, response)
response.headers.set('debug-1', JSON.stringify(resolve))
response.headers.set('debug-2', JSON.stringify(resolve.new_host))

return response
}