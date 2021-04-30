addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const home = await override_variables.get("home", {type: "json"})
const net = await override_variables.get("net", {type: "json"})
const ml = await override_variables.get("ml", {type: "json"})

const origin = { home, net, ml }

const resolve = origin.find( ({incoming_path}) => newRequest.pathname == incoming_path ) ?? {}

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