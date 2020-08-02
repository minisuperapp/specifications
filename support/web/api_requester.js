require('isomorphic-fetch')
const cookie = require('cookie')

const api_requester = {}

api_requester.send = async (request, delivererSessionToken, session_token) => {
  const info = {
    method: request.method,
    body: request.method === 'GET' ? undefined : JSON.stringify(request.payload),
    headers: {
      'Content-Type': 'application/json',
      'session_token': delivererSessionToken,
      'Cookie': `session_token=${session_token}`,
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
        setSessionToken: getSessionTokenCookie(res),
      },
    })
  } catch (err) {
    console.log(responseText, request.uri + '/' + request.path, info)
    throw err
  }
}

function getSessionTokenCookie(res) {
  if (res.headers && res.headers._headers && res.headers._headers['set-cookie']) {
    const foundCookie = res.headers._headers['set-cookie'].find(c => c.startsWith('session_token'))
    if (foundCookie) {
      return cookie.parse(foundCookie)['session_token']
    }
  }
}

module.exports = api_requester
