require('isomorphic-fetch')

const api_requester = {}

api_requester.send = async (request, sessionToken) => {
  const info = {
    method: request.method,
    body: request.method === 'GET' ? undefined : JSON.stringify(request.body),
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    const res = await fetch(request.uri + '/' + request.path, info)
    return await res.json()
  }
  catch (err){
     console.log(request.uri + '/' + request.path, info)
     console.log(err)
  }
}

module.exports = api_requester
