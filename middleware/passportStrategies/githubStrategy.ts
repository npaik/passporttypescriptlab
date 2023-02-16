import { Request } from "express";
import { Strategy as GitHubStrategy } from "passport-github2";
import { VerifyCallback } from "passport-oauth2";
import { PassportStrategy } from "../../interfaces/index";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: "",
    clientSecret: "",
    callbackURL: "",
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: TProfile,
    done: VerifyCallback
  ) => {}
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
