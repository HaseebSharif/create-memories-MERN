import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';



export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

       return res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
console.log('deleted',id)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {

        await PostMessage.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getPosts = async(req,res)=>{

    try{
        const posts = await  PostMessage.find({});
      return  res.status(201).json(posts );
    }catch(err){
        res.status(409).json({ message: err.message });

    }
 

}


//update post 

export const updatePost = async(req,res)=>{
    const { title, message, selectedFile, creator, tags } = req.body;
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    try{
     const updatedData =    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    return res.json(updatedData);
    }catch(err){
       return res.status(409).json({ message: err.message });

    }
 

}

export const likePost = async(req,res)=>{
    const {id} = req.params;
    console.log('id',id)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try{

        const post  = await PostMessage.findById(id);
        const updatedPost =await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1}, { new: true });
       return res.json(updatedPost);
    }catch(err){
       return res.status(409).json({ message: err.message });
    }
}