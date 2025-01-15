import { Request, Response, NextFunction } from 'express';


const pageNotFound = (req: Request,res: Response,next: NextFunction) => {
    res.json({
        success:false,
        message : 'Page Not Found',
    })
}

export default pageNotFound;