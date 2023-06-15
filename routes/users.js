import express from "express";

import {getUser, getUserFriends, addRemoveFriend,} from "../controlers/users.js";

import { verifytoken } from "../middleware/auth.js";


const router = express.Router();

//READ route//
router.get("/:id", verifytoken, getUser);
router.get("/id:/friends", verifytoken, getUserFriends);

//UPDATE route//
router.patch("/:id/:friendId", verifytoken, addRemoveFriend);


export default router;