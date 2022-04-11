const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require("passport")
const {User} = require('./model/userModel');

const GOOGLE_CLIENT_ID = "556886871479-0f473hqfflspuammok2g6lnbutkcd1vg.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
  },
  async(request, accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({googleID: profile.id})
        if(currentUser){
            console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            const newUser = new User({
                googleID: profile.id,
                username: profile.displayName
            })
            await newUser.save()
                console.log('created new user: ', newUser);
                done(null, newUser);
        }
})
);

passport.serializeUser((user, done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(_id, done)=>{
  const user = await User.findById(_id)
        done(null, user);

})
