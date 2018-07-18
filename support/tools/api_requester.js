require('isomorphic-fetch')
const cookie = require('cookie')

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

    return Promise.resolve({
      ...jsonResponse,
      cookies: {
        setCustomerCode: getCustomerCodeCookie(res),
      },
    })
  } catch (err) {
    console.log(request.uri + '/' + request.path, info)
    console.log(err)
  }
}

function getCustomerCodeCookie(res) {
  if (res.headers && res.headers._headers && res.headers._headers['set-cookie']) {
    const foundCookie = res.headers._headers['set-cookie'].find(c => c.startsWith('customer-code'))
    if (foundCookie) {
      return cookie.parse(foundCookie)['customer-code']
    }
  }
}

module.exports = api_requester
