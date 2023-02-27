import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";
import {} from "../../node_modules/@types/passport-github2/index.d";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: "GITHUB_CLIENT_ID",
    clientSecret: "GITHUB_CLIENT_SECRET",
    callbackURL: "http://127.0.0.1:8000/auth/github/callback",
    passReqToCallback: true,
  },
  /*
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
 */
  /* FIX ME 😭 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void
  ) => {}
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
