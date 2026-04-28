export async function onRequest(context) {

  const url = new URL(context.request.url)
  const target = url.searchParams.get("url")

  if (!target) {
    return new Response("Missing url parameter", { status: 400 })
  }

  try {

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    })

    const data = await response.text()

    return new Response(data, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "text/plain",
        "Access-Control-Allow-Origin": "*"
      }
    })

  } catch (err) {

    return new Response("Proxy error: " + err.message, { status: 500 })

  }

}
