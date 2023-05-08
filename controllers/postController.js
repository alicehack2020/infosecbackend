import Post from "../model/Post.js";
export const addRecord = async (req, res) => {
    try {
        const { fullName, email, contactNumber, city, state } = req.body;
        const  userid  = req.user._id;
        
        if (fullName && email && contactNumber && city && state)
        {
            const userData ={
                fullName,
                email,
                contactNumber,
                city,
                state,
                userid
              }
              const newPost = new Post(userData);
              await newPost.save();
              res.status(201).json({message:"record added"}); 
        } else {
            res.status(201).json({message:"all fileds are required"});   
        }

      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  
export const updateRecord = async (req, res) => {
    try {
      const id = req.query.id; 
      const { fullName, email, contactNumber, city, state} = req.body;
      const existingRecord = await Post.findById(id);
  
      if (!existingRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
  
      existingRecord.fullName = fullName;
      existingRecord.email = email;
      existingRecord.contactNumber = contactNumber;
      existingRecord.city = city;
      existingRecord.state = state;
  
      const savedRecord = await existingRecord.save();
      res.status(200).json({message:"Record updated"});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  

export const deleteRecord = async (req, res) => {
    try {
    
        const id = req.query.id;
        const deletedRecord = await Post.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
        
      res.status(200).json({message:"record deleted"});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  

export const getAllData = async (req, res) => {
    try {
      const  userid  = req.user._id;
      const data = await Post.find({userid:userid});
  
      if (!data) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  

export const getOne = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id)
    const data = await Post.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};