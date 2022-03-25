require('isomorphic-fetch')
const cookie = require('cookie')
const ApiFunctionRequest = require('../web/requests/$api_function_request')

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
    const customerSessionToken = getSessionTokenCookie(res, responseText, 'customer_session_token')
    const delivererSessionToken = getSessionTokenCookie(
      res,
      responseText,
      'deliverer_session_token',
    )
    const parsedResponse = JSON.parse(responseText)
    const body = request instanceof ApiFunctionRequest ? parsedResponse.body : parsedResponse

    return Promise.resolve({
      ...body,
      cookies: {
        customerSessionToken,
        delivererSessionToken,
      },
    })
  } catch (err) {
    if (res) {
      console.log(res.status, res.statusText)
    }
    console.log(err.message, request.uri + '/' + request.path, info)
    throw err
  }
}

function getSessionTokenCookie(res, responseText, cookie_name) {
  if (res.headers && res.headers._headers && res.headers._headers['set-cookie']) {
    const foundCookie = res.headers._headers['set-cookie'].find(c => c.startsWith(cookie_name))
    if (foundCookie) {
      return cookie.parse(foundCookie)[cookie_name]
    }
  }
  const response = JSON.parse(responseText)
  if (response.headers && response.headers['set-cookie']) {
    const foundCookie = response.headers['set-cookie'].includes(cookie_name)
    if (foundCookie) {
      return cookie.parse(response.headers['set-cookie'])[cookie_name]
    }
  }
}

module.exports = api_requester
