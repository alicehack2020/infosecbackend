import User from "../model/User.js";
import { encrypt, checkPasswordStrength, decrypt } from "../helper/helper.js";
import Jwt from "jsonwebtoken";
export const userRegister = async (req, res) => {
    try {
        const {fullName,email,password}=req.body
           if (fullName  && email && password)
           {
               const emailCheck=await User.find({email:email})
               
               if (emailCheck.length > 0)
               {
                   res.status(400).json({ message: "email already used"});  
               }
               else {
                const isStrongPassword = await checkPasswordStrength(password);
                if (isStrongPassword) {
                    const hashpassword = await encrypt(password) 
                    console.log("hashpassword",hashpassword)
                    console.log("password",password)
                    const userData = {
                        fullName: fullName,
                        userName: email,
                        email: email,
                        password:hashpassword
                    }
                const newUser = new User(userData);
                await newUser.save();
                res.status(201).json(newUser); 
                } else {
                    res.status(400).json({ message: "The password is weak",info:"Please choose a password that is at least 8 characters long, includes both uppercase and lowercase letters, at least one digit, and no spaces."}); 
                  }  
               }  
           }
           else {
               res.status(400).json({ message: "all fields are required"}); 
           } 
      
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
}
export const userLogin = async (req, res) => { 
    try {
        const { email, password } = req.body;        
        const user = await User.findOne({ email: email });

        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await decrypt(password, user.password);    
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const data = {
            userid: user._id,
            email: user.email,
            fullname: user.fullname,
        }
        console.log(process.env.JWT_SECRET_KEY)
        const token=Jwt.sign(data,
            process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
        
        res.status(200).json({message:"login sucessfully",data,token});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}
export const updatePassword = async (req, res) => {
  try {
    const  userid  = req.user._id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await decrypt(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }
    const hashPassword = await encrypt(newPassword);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const  userid  = req.user._id;
    const {fullName} = req.body;
    const existingRecord = await User.findById(userid);
    if (!existingRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    existingRecord.fullName = fullName;
    
    const savedRecord = await existingRecord.save();
    res.status(200).json({message:"details updated"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getuserDetails = async (req, res) => {
  try {
    const  userid  = req.user._id;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "not found" });
    }

    const data = {
      email: user.email,
      fullName:user.fullName
    }
    
    res.status(200).json({message:"details",data});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}