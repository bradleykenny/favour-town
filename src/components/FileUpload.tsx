import fs from "fs";
import AWS from "aws-sdk";

/************* Client Initialisation *************/
// Enter copied or downloaded access ID and secret key here
// for user "Test"
const ID = "AKIAVLL6HVDOX2VU4H5S";
const SECRET = "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";

// The name of the bucket that you have created
const BUCKET_NAME = "favourtown";

// credentials
const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});

// uploading functionalities
export const uploadFile = (user_id: string, fileName: File) => {
	// Setting up S3 upload parameters
	const fileTypeArray = fileName.name.split(".")
	const fileType = fileTypeArray[fileTypeArray.length-1]
	
	const params = {
		Bucket: BUCKET_NAME,
		Key: user_id + "." + fileType, // File name you want to save as in S3
		Body: fileName,
	};

	// Uploading files to the bucket
	s3.upload(params, (err: any, data: any) => {
		if (err) {
			console.log('error in uploading');
			throw err;
		}
		console.log("File uploaded successfully.");
	});
};


