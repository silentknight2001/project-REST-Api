import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import multer from "multer"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import {register} from "./controlers/auth.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { verifytoken } from "./middleware/auth.js"
import {createPost} from "./controlers/posts.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import {users, posts} from "./data/index.js"
// configuration //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//file storage 
//whenever use upload the phot or file it eill store in our "punlic/assets" file, if use aws s3 bakets or sumthin than its would be different 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "pulic/assets");
    },
    filename: function(req, file, cb){
        cb(ull, file.originalname);
    }
});
const upload = multer({storage}); //it will help us save it will use this veriable;


// Route with files//
// tghis route we write here because we need this upload variable so insted of writing in route folder we keept it here and other route we will write in route folder :)
app.post("auth/register", upload.single("picture"),register);
app.post("/post", verifytoken, upload.single("picture"), createPost);

// Route //
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// Mongoose Setup = database connection//
const PORT = process.env.PORT || 7000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server port: ${PORT} database connected`));

      // weadd this fake data only one time

      User.insertMany(users);//
      Post.insertMany(posts);//

}).catch((error)=> console.log(`${error} did not connect`));

