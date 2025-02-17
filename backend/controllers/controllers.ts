import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { helperFunctionError, helperFunctionSuccess } from "../helper/responseHelper";
import { error } from "console";

dotenv.config();

const prisma=new PrismaClient();
const saltRounds=10;

export const getData=async(req:Request, res:Response)=>{
    const {username, password, email}=req.body;
    try{
        const result1=await prisma.user.findMany({
            where:{
                email: email
            }
        });
        const result2=await prisma.user.findMany({
            where:{
                username: username
            }
        });
        if (result1.length!==0){
            helperFunctionError(res, 409, {message: "Email already exists. Try another email"});
            // res.status(409).json({message: "Email already exists. Try another email"});
        }
        else if (result2.length!==0){
            helperFunctionError(res, 409, {message: "Username already exists. Try another username"});
            // res.status(409).json({message: "Username already exists. Try another username"});
        }
        else{
            //create user and redirect to login page
            const hashedPassword=await bcrypt.hash(password, saltRounds);
            await prisma.user.create({
                data:{
                    username,
                    email, 
                    password: hashedPassword
                }
            });
            helperFunctionSuccess(res, 200, {message: "User created successfully"});
            // res.status(200).json({message: "User created successfully"});
        }
    }
    catch(error){
        console.log("some error occurred");
    }
}

export const logIn=async(req:Request, res:Response)=>{
    const {username, password}=req.body;
    try{
        const result=await prisma.user.findMany({
            where:{
                username
            }
        });
        if (result.length===0){
            // res.status(401).json({message: "Invalid username"});
            helperFunctionError(res, 401, {message: "Invalid username"});
        }
        else{
            //log in to the respective route(user/admin)
            const checkPassword=await bcrypt.compare(password, result[0].password);
            if (checkPassword){
                const role=result[0].role;
                const email=result[0].email;
                const secret=process.env.JWT_SECRET as string;
                const token=jwt.sign({username, email, role}, secret, {expiresIn: "10m"});
                // res.json({role, token});
                helperFunctionSuccess(res, 200, {role, token});
            }
            else{
                // res.status(401).json("Incorrect password. Try again");
                helperFunctionError(res, 401, {message: "Incorrect password. Try again"});
            }
        }
    }
    catch(error){
        helperFunctionError(res, 501, {message: "Some error has occurred"});
    }
}

export const logOut=(req:Request, res:Response)=>{
    res.json({message: "Logout successful"});
}

export const verifyToken=(req:Request, res:Response)=>{
    const {item}=req.body;
    if (!item){
        // return helperFunctionSuccess(res, 200, {message: "Token is required", role: "invalid"})
        // res.json({message: "Token is required", role: "invalid"});
        helperFunctionError(res, 401, {message: "You must login to continue", role: "Invalid"});
    }
    else{
        try{
            const secret=process.env.JWT_SECRET as string;
            const decoded=jwt.verify(item, secret) as {username: string, email: string, role: string};
            // console.log(decoded);
            helperFunctionSuccess(res, 200, {message: "ok", role: decoded.role, username: decoded.username});
            // res.json({message: "ok", role: decoded.role, username: decoded.username});
        }
        catch(error){
            helperFunctionError(res, 401, {message: "Invalid token", role: "Invalid"});
            // res.json({message: "Invalid token", role: "invalid"});
        }
    }
}

export const forgotPassword=async(req:Request, res:Response)=>{
    const {email}=req.body;
    // const result=await prisma.user.findUnique({
    //     where:{
    //         username
    //     }
    // })
}

export const resetPassword=async (req:Request, res:Response)=>{
    const {currentPassword, username, entry, confirmEntry}=req.body;
    try{
        //validate existing password
        const result=await prisma.user.findMany({
            where:{
                username
            }
        });
        const comparePassword=await bcrypt.compare(currentPassword, result[0].password);
        if(comparePassword){
            if (entry===confirmEntry){
                const hashedPassword=await bcrypt.hash(entry, saltRounds);
                await prisma.user.update({
                    where:{
                        username: username
                    },
                    data:{
                        password:hashedPassword
                    }
                });
                helperFunctionSuccess(res, 200, {message: "Password updated"});
            }
            else{
                throw new Error("Passwords don't match");
            }
        }
        else{
            throw new Error("Incorrect existing password");
        }
    }
    catch(error:any){
        helperFunctionError(res, 400, {message:error.message});
    }
}
