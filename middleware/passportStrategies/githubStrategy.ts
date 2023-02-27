import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";
import { addGitHubUserToDatabase } from "../../controllers/userController";
import {} from "../../node_modules/@types/passport-github2/index.d";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.username || "",
    clientSecret: process.env.password || "",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void
  ) => {
    addGitHubUserToDatabase(profile);
    done(null, profile);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
