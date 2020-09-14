require('isomorphic-fetch')
const cookie = require('cookie')

const api_requester = {}

api_requester.send = async (request, customer_session_token, deliverer_session_token) => {
  const info = {
    method: request.method,
    body: request.method === 'GET' ? undefined : JSON.stringify(request.payload),
    headers: {
      'Content-Type': 'application/json',
      Cookie: `customer_session_token=${customer_session_token}; deliverer_session_token=${deliverer_session_token};`,
      'is-test': 'true',
    },
  }
  let responseText
  let res
  try {
    res = await fetch(request.uri + '/' + request.path, info)
    if (res.status === 401) {
      return {
        success: false,
        status: 401,
      }
    }
    responseText = await res.text()

    return Promise.resolve({
      ...JSON.parse(responseText),
      cookies: {
        customerSessionToken: getSessionTokenCookie(res, 'customer_session_token'),
        delivererSessionToken: getSessionTokenCookie(res, 'deliverer_session_token'),
      },
    })
  } catch (err) {
    console.log(res.status, res.statusText, err.message, request.uri + '/' + request.path, info)
    throw err
  }
}

function getSessionTokenCookie(res, cookie_name) {
  if (res.headers && res.headers._headers && res.headers._headers['set-cookie']) {
    const foundCookie = res.headers._headers['set-cookie'].find(c => c.startsWith(cookie_name))
    if (foundCookie) {
      return cookie.parse(foundCookie)[cookie_name]
    }
  }
}

module.exports = api_requester
