import { Request, Response } from "express";

export const createComments = async (req:Request,res:Response) => {
    try {
        res.status(200).json({message: "ok"});
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
    }
}