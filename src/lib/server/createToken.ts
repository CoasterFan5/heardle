import { APPLE_KEY_ID, APPLE_PRIVATE_KEY, APPLE_TEAM_ID } from "$env/static/private"
import pkg from 'jsonwebtoken';
const {sign} = pkg;

const EXPIRES_DELAY = 240 // seconds


export const createDeveloperToken = () => {
  const dToken = sign({
    "iss":  APPLE_TEAM_ID,
    "iat": Math.floor(Date.now() / 1000),
    "exp": Math.floor(Date.now() / 1000) + EXPIRES_DELAY
  }, APPLE_PRIVATE_KEY, {
    algorithm: "ES256",
    header: {
      alg: "ES256",
      "kid": APPLE_KEY_ID,
    }
  })

  return dToken
}
