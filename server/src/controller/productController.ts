import { NextFunction, Request, Response } from "express";

export const createProduct =  async (req: Request, res: Response) => {
    const { name, description, price, category, countInStock } = req.body;
    
}