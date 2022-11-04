import { NextFunction, Request, Response } from 'express';
import { ICreateUser } from './interfaces';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    console.log("body => ", req.body);
    const body: ICreateUser = req.body;

    return res.status(200).json({ test: "register" });
  } catch (error) {
    next(error);
  }
}

export const status = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    return res.status(200).json({ test: "status" });
  } catch (error) {
    next(error);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    return res.status(200).json({ test: "logout" });
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    return res.status(200).json({ test: "login" });
  } catch (error) {
    next(error);
  }
}