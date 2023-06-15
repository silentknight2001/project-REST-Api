import express from "express"
import {getFeedPosts, getUserPost, likePost} from "../controlers/posts.js";
import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

// read data//

//here we get all feed of our app user 
router.get("/", verifytoken, getFeedPosts);

//user post we get
router.get("/:userId/posts", verifytoken, getUserPost);


// Update

// for like post  
router.patch("/:id/like", verifytoken, likePost);

export default router;