import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullname : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phonenumber : {
        type: Number,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ['student', 'recruiter'],
        required: true,
    },
    profile : {
        bio: {type : String},
        skills: [{type : String}],
        resume: [{type : String}], // Store the url link of resume
        resumeDisplayName: {type : String},
        company: {type:mongoose.Schema.Types.ObjectId, ref : "Company"},
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)