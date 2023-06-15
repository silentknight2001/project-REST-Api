import User from "../models/User.js";

// READ//
export const getUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// here we grabing all frnds from our frnd list :)
export const getUserFriends = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
       
        //here using promise because we do multiple request to the database for grabing all frnds data :)

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        // make sure we formate the proper way for the forntEnd
        // inside the map we modified aour schema little bit for forntEnd
        const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath})=>{
            return {_id, firstName, lastName, occupation, location, picturePath };    
        });
        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// UPDATE friends// add-remove frinds//

export const addRemoveFriend = async (req, res)=>{
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findId(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friends.filter((id)=> id !== id);
        }else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        // make sure we formate the proper way for the forntEnd
        // inside the map we modified aour schema little bit for forntEnd
        const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath})=>{
            return {_id, firstName, lastName, occupation, location, picturePath };    
        });
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

