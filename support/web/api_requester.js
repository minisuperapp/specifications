require('isomorphic-fetch')
const cookie = require('cookie')

const api_requester = {}

api_requester.send = async (request, delivererSessionToken, customer_code) => {
  const info = {
    method: request.method,
    body: request.method === 'GET' ? undefined : JSON.stringify(request.payload),
    headers: {
      'Content-Type': 'application/json',
      'session-token': delivererSessionToken,
      'Cookie': `customer-code=${customer_code}`,
      'is-test': 'true',
    },
  }
  let responseText
  try {
    const res = await fetch(request.uri + '/' + request.path, info)
    responseText = await res.text()

    return Promise.resolve({
      ...JSON.parse(responseText),
      cookies: {
        setCustomerCode: getCustomerCodeCookie(res),
      },
    })
  } catch (err) {
    console.log(responseText, request.uri + '/' + request.path, info)
    throw err
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
