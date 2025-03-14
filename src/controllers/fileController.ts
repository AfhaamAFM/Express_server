import response from '../lib/typings/helpers/responseHelper.js';
import { Request, Response, NextFunction } from 'express';

/**
 *
 * @param {*} req
 * @param {*} res
 * @description This is controller for uploading file to S3 using multer
 */
export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err: any) {
    console.log(`Error from fileUpload \n ${err}`);
    return res.status(500).json(response.InternalServer(500, 'Internal server error', 'Error from fileUpload', undefined, err));
  }
};
