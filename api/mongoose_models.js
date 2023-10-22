import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://picsum.photos/400/400"
    }
})

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: "This feels a little empty.."
    },
    content: {
        type: String,
        default: "This feels soooo empty.."
    },
    image: {
        type: String,
        default: "https://picsum.photos/600/800"
    },
    isprivate: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        default: null
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

export const User = mongoose.model("User", userSchema)
export const Post = mongoose.model("Post", postSchema)