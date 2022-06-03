"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport = require("passport");
exports.passport = passport;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const Config_1 = require("../../Infrastructure/Cross-Cutting/Config");
function GoogleStrategyCbFunc(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
const clientDetailsObj = {
    clientID: Config_1.GOOGLE_CLIENT_ID,
    clientSecret: Config_1.GOOGLE_CLIENT_SECRET,
    callbackURL: `${Config_1.NGROK_URI}/google/callback`,
};
function serializeUserCbFunc(user, done) {
    done(null, user);
}
function deserializeUserCbFunc(user, done) {
    done(null, user);
}
passport.serializeUser(serializeUserCbFunc);
passport.deserializeUser(deserializeUserCbFunc);
passport.use(new passport_google_oauth20_1.Strategy(clientDetailsObj, GoogleStrategyCbFunc));
//# sourceMappingURL=PassportService.js.map