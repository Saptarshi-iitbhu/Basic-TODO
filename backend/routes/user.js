import express from "express";
import jwt from "jsonwebtoken"
import z from "zod";
import bcrypt from "bcrypt";
import { Todo, User } from "../db";
import { JWT_SECRET } from "..";
import userMiddleware from "../middlewares/user.js"

const router = express.Router();

const userschema = z.string();
const passwordschema = z.string().min(8, "Password must be of length 8");
const emailschema = z.string().email();

const todoschema = z.object({
    title: z.string().min(1),
    description: z.string().min(10)
});

router.post("/sign-up", async (req, res) => {
    const { username, password, email } = req.body;

    const usercheck = userschema.safeParse(username);
    const passwordcheck = passwordschema.safeParse(password);
    const emailcheck = emailschema.safeParse(email);

    if (
        !usercheck.success ||
        !passwordcheck.success ||
        !emailcheck.success
    ) {
        return res.status(403).json({
        msg: "Give correct credentials"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPassword,
        email
    });

    res.status(200).json({
        msg: "User is successfully created"
    });
});

router.post('/sign-in', async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });

    if(!user){
        return (
            res.status(403).json({
            msg: "Incorrect credential"
        })
    );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        return (
            res.status(403).json({
            msg: "Incorrect credential"
        })
    );
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);
    
    res.status(200).json({
        token
    });
});

router.post('/todo', userMiddleware, async (req, res)=>{
    const todocheck = todoschema.safeParse(req.body);

    if(!todocheck.success){
       return (
        res.status(403).json({
            msg: "Add valid ToDo"
        })
       );
    }

    const title = req.body.title;
    const description = req.body.description;
    const userId = req.userId;
    
    const todo = await Todo.create({
        title: title,
        description: description,
        markDone: false
    });

    await User.updateOne({
        _id: userId
    },{
        $push:{
            todos: todo._id
        }
    });
});

router.get("/todo", userMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const todos = await Todo.find({
        _id: { $in: user.todos }
    });

    res.status(200).json({ todos });
});

router.delete("/todo/:todoId", userMiddleware, async(req, res) => {
    const userId = req.userId;
    const todoId = req.params.todoId;

    const user = await User.findById(userId);

    if(!user.todos.includes(todoId)){
        return (
            res.status(403).json({
                msg: "Particular todo is not present in user's todo"
            })
        );
    }

    await User.updateOne(
        { _id: userId },
        { $pull: { todos: todoId } }
    );

    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({
        msg: "Todo completed and removed successfully"
    });
});

export default router;
