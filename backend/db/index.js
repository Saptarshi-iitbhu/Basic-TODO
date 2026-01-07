import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: String,
    description: String,
    markDone: {
        type: Boolean,
        default: false
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {  
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo" 
    }]
});

const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

export { Todo, User };
