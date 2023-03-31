import { Request, Response } from "express";


class ErrorHandler {
    public serverErrorHandler(req: Request, res: Response) {
        return res.json({status:500,error_message:"Упс! Что-то пошло не так..."});
    }
    
    
    public clientErrorHandler(req: Request, res: Response) {
        return res.json({status:404,error_message:"Not found"});
    }
}

export default new ErrorHandler();
