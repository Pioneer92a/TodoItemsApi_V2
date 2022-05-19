import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NGROK_URI,
} from "../../Infrastructure/Cross-Cutting/Config";

function GoogleStrategyCbFunc(accessToken, refreshToken, profile, done) {
  return done(null, profile); // serialize function will be called here
}

// we need ngrok to generate https tunnel
// unfortunately a new link has to be pasted in the .env file for every new ngrok session
const clientDetailsObj = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${NGROK_URI}/google/callback`,
};

function serializeUserCbFunc(user, done) {
  done(null, user);
}

function deserializeUserCbFunc(user, done) {
  done(null, user);
}

// main passport settings here
passport.serializeUser(serializeUserCbFunc);

passport.deserializeUser(deserializeUserCbFunc);

passport.use(new GoogleStrategy(clientDetailsObj, GoogleStrategyCbFunc));

export { passport };
