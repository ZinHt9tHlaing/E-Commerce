import { NextFunction, Request, Response } from "express";

export const getProducts =  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Product got" });
}