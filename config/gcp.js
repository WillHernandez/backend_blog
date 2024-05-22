import { Storage } from '@google-cloud/storage'
import dotenv from 'dotenv'
dotenv.config()

const gcpBucket = new Storage({
	projectId: process.env.GCP_PROJECT_ID,
	keyFilename: process.env.GCP_KEYFILENAME
	}
)

export default gcpBucket
