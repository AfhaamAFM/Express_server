import multer from "multer"
import fs from 'fs/promises'
import AWS from '../config/AWS_config.js'

import dotenv from 'dotenv'
import response from "../helpers/responseHelper.js"

dotenv.config()


const s3 = new AWS.S3()

const bucket_name = "jobeebucket"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename: (req, file, cb) => {

        cb(null, file.originalname)

    },

})
const upload = multer({ storage: storage })

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description This is controller for uploading file to S3 using multer
 */
export const uploadFile = (async (req, res, next) => {
    try {

        const uploadFile = upload.single('upload')

        uploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.

                console.log("Multer upload error");
                console.log(err);
                return res.status(400).json(response.InternalServer(400, "Internal server error", "Multer Upload error", undefined, err))
            } else if (err) {
                console.log("An unknown error occurred when uploading.");
                console.log(err);
                return res.status(500).json(response.InternalServer(500, "Internal server error", "Multer :An unknown error occurred when uploading.", undefined, err))

                // An unknown error occurred when uploading.
            }
            // Everything went fine. 


            if (!req.file) {

                const valErr = {
                    field: "upload",
                    message: "No Image uploaded"
                }
                return res.status(400).json(response.validation(400, valErr, undefined))
            }


            const { originalname, path } = req.file

            const fileData = await fs.readFile(path)


            s3.putObject({
                Bucket: bucket_name,
                // ACL: 'public-read',
                Key: "uploads/" + originalname,
                Body: fileData,

            }, (err, s3Data) => {

               
                fs.unlink(path)
                if (s3Data) {

                    return res.status(201).json(response.creation(201, undefined, s3Data, undefined))
                }


                console.log('============S3 Upload Error========================');
                console.log(err);
                return res.status(500).json(response.InternalServer(500, "Internal server error", "Multer :S3 put Object :: error occurred when uploading.", undefined, err))






            })

            next()

        })


    } catch (err) {

        console.log(`Error from fileUpload \n ${err}`);
        return res.status(500).json(response.InternalServer("500", "Internal server error", "Error from fileUpload", undefined, err))

    }

})
