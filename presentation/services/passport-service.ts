import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// we need ngrok to generate https tunnel
// unfortunately a new link has to be pasted here for every new ngrok session
const ngrokURI = "https://b857-202-165-233-154.ngrok.io";

function GoogleStrategyCbFunc(accessToken, refreshToken, profile, done) {
  // use the profile info (mainly profile id) to check if the user is registered in your database
  // profile will contain email, id, etc.
  // register the user if its not present
  // select the user if it is present
  // pass the user in done instead of profile
  // return done(err, user);
  // console.log(accessToken);

  return done(null, profile); // serialize function will be called here
}

const clientDetailsObj = {
  clientID:
    "152891392650-r11uegdppifl1e1nleok5q3llj5b7ge5.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: `${ngrokURI}/google/callback`,
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
