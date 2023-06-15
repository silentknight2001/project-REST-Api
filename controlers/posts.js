import Post from "../models/Post.js";
import User from "../models/User.js";



// create 

export const createPost = async(req,res)=>{
    try{
         const {userId, description, picturePath} = req.body;
         const user = await User.findById(userId);
         const newpost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
         })
         await newpost.save();

        // so once we create a new post after that we can grab all the post to our feed :) lke news feed
         const post = await Post.find();
         res.status(201).json(post);
    }catch(error){
      res.status(409).json({message: error.message});
    }
}


//read data
// get feed inour app

export const getFeedPosts = async(req,res)=>{
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


// grabing user post
// when ever user click on other user profile, than he will get all the post regurding that specific user


export const getUserPost = async(req, res)=>{
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


// liked post are grabing supposd how many post a user a liked past few days or few houer a specific user wnat to grabe it

//update

export const likePost = async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isliked = post.likes.get(userId);

        if(isliked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatepost = await post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new : true},
        )
        res.status(200).json(updatepost)
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
