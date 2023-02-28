import { userModel, database } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return user;
      }
    }
  } catch (error) {
    return null;
  }
};
const getUserById = (id: number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

function addGitHubUserToDatabase(profile: any) {
  const user = {
    id: profile.id,
    name: profile.displayName,
    role: "user"
  };
  database.push(user);
}

export { getUserByEmailIdAndPassword, getUserById, addGitHubUserToDatabase };
