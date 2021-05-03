addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const origin = [
    await override_variables.get("home"), // { 'new_host': 'home.erfianugrah.best', 'incoming_path': '/home', 'incoming_port': 1234 }
    await override_variables.get("net"), // { 'new_host': 'www.erfianugrah.net', 'incoming_path': '/net', 'incoming_port': 1234 }
    await override_variables.get("ml") // { 'new_host': 'www.erfi.ml', 'incoming_path': '/ml', 'incoming_port': 1234 }
]

const resolve = origin.find( ({incoming_path}) => newRequest.pathname = incoming_path ) ?? {}

//newRequest.port = resolve.incoming_port
newRequest.host = resolve.new_host

const newResponse = await fetch(request,
        { cf:
            {
                resolveOverride: resolve.new_host
                    },
        },)

const response = new Response(newResponse.body, newResponse)
response.headers.set('debug', JSON.stringify(resolve))
return response
}