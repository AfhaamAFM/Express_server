import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

AWS.config.update({

    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
})


export default AWS