const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const userModel = require("./models/userModel");
const dotenv = require('dotenv').config();


passport.use(
  new GoogleStrategy(
      {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
          try {
              const user = await userModel.findOne({ email: profile.emails[0].value });

              if (user) {
                  // return done(null, user);
                  return done(null, profile);
              }

              const name = profile.displayName.split(' ');

              const newUser = new userModel({
                 firstname: name[0],
                 lastname: name[1],
                 provider: profile.provider,
                 googleId: profile.id,
                 email: profile.emails[0].value,
                 isAdmin: false,
              });

              const savedUser = await newUser.save();
              return done(null, savedUser);
          } catch (err) {
              return done(err, false);
          }
      }
  )
);


  
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        //Due to github policies, I cant not specify a user email if it is private
        done(null, profile);
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });