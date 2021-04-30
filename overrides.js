addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {

const newRequest = new URL(request.url)

const { asset, regex, ...cache } = cacheAssets.find( ({regex}) => newRequest.pathname.match(regex)) ?? {}

const newResponse = await fetch(request,
        { cf:
            {
                resolveOverride: resolve.origin
                    },
        },)

const response = new Response(newResponse.body, newResponse)
response.headers.set('debug', JSON.stringify(cache))
return response
}