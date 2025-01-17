// sign up route
import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js"

export const register = async (req,res) => {
    try {
        const {name, email, password} = req.body

        // before creating account check that we got all the fields data
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }
        // now we before creating account we check that this email should not registered before 
        const user = await User.findOne({email})

        if(user) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            })
        }
        // now we create a new user
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            success: true,
            message: "Account created successfully"
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to register..."
        })
    }
}

export const login = async(req,res) => {
    try {
        const {email, password} = req.body

        // before login check that we got all the fields data
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }
        // now we check that this email is registered before if it is not then error
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        // now we check password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        // now we generate token as when we want to authenticate user for that we will be using jwt 
        // for that we will do that in different place as we will be needing that function again a few 
        // times so rather doing same thing again and again lets create it once and use where ever required
        generateToken(res, user, `Welcome back ${user.name}`);



    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to login..."
        })
    }
}

export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge : 0}).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to logout..."
        })
    }
}

// get user profile
export const getUserProfile = async(req,res) => {
    try {
        // first check logged in as profile would be shown to user ehich is logged in
        // for this we will create isAuthenticated middleware we have called that in route itself
        // so we dont need to check here
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");

        if(!user) {
            return res.status(404).json({message: "Profile Not Found", success: false})
        }
        return res.status(200).json({success: true, user })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to load user profile..."
        })
    }
}

export const updateUserProfile = async(req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;

        const profilePhoto = req.file

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({message: "User Not Found", success: false})
        }
        // extract the public id of the old image from the url
        if(user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0]
            // delete the old image from cloudinary
            deleteMediaFromCloudinary(publicId)
        }
        // upload the new image to cloudinary
        const cloudResponse = await uploadMedia(profilePhoto.path)
        const photoUrl = cloudResponse.secure_url

        const updatedData = {name, photoUrl}
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new: true}).select("-password")
        return res.status(200).json({
            success: true, 
            user: updatedUser, 
            message: "Profile updated successfully"
        })


    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to update user profile..."
        })
    }
}