import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { memoryStore } from "../app";
import { userModel } from "../models/userModel";

router.get("/", (req, res) => {
  res.redirect("/auth/login");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user });
});

const checkAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    const currentUser = (req.user as any).id;
    if (currentUser && userModel.findById(currentUser)?.role === "admin") {
      return next();
    }
  }
  res.redirect("/dashboard");
};

router.get("/admin",ensureAuthenticated, checkAdmin, (req, res) => {
  memoryStore.all((err, sessions) => {
    console.log("SESSIONS: ", sessions);
    if (sessions) {
      const sessionIds = Object.keys(sessions);
      // ["JC5QdsoPlw04xDMzwaRUWkU1iFSM1Xs7", "JC5QdsoPlw04xDMzwaRUWkU1iFSM1Xs7"]
      const sessionList = sessionIds.map((sessionId) => {
        return ({
          sid: sessionId,
          userId: (sessions[sessionId] as any).passport.user,
        });
      })
      console.log("SESSIONLIST: ", sessionList);
      
      const currentUser = req.user;
      console.log("THISSSS USER: ", req.user);
      
      res.render("admin", {sessionList, currentUser})
    } else {
      res.redirect("/auth/login");
    }
  });
});

router.post("/destroy", (req, res) => {
  const sid = req.body.sessionId;
  console.log("REVOKE THIS: ", sid);
  
  memoryStore.destroy(sid, (err) => {
    console.log("Revoked successfully");
    res.redirect("/admin");
  });
});

export default router;
