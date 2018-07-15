require('isomorphic-fetch')

const api_requester = {}

api_requester.send = async (request, delivererSessionToken, customerCode) => {
  const info = {
    method: request.method,
    body: request.method === 'GET' ? undefined : JSON.stringify(request.payload),
    headers: {
      'Content-Type': 'application/json',
      'session-token': delivererSessionToken,
      'customer-code': customerCode,
      'is-test': 'true',
    },
  }
  try {
    const res = await fetch(request.uri + '/' + request.path, info)
    const jsonResponse = await res.json()

    if (res.headers && res.headers._headers && res.headers._headers['set-customer-code']) {
      return Promise.resolve({
        ...jsonResponse,
        headers: {
          setCustomerCode: res.headers._headers['set-customer-code'][0]
        }
      })
    }

    return Promise.resolve(jsonResponse)
  } catch (err) {
    console.log(request.uri + '/' + request.path, info)
    console.log(err)
  }
}

module.exports = api_requester
