import { promises as fs } from 'fs'; 
import AWS from 'aws-sdk';
import crypto from 'crypto';
import { AwsData } from 'types/base.types';
import { string } from 'zod';
import { SupportingDocument } from 'types/research.master';

 const config =  {
    "accessKeyId": process.env.accessKeyId,
    "secretAccessKey": process.env.secretAccessKey,
    "bucketName" :  process.env.bucketName
   };

   AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
   });

   const s3 = new AWS.S3();

export async function uploadFile(documents : any) : Promise<SupportingDocument> {
 try {
    
     let filepaths: SupportingDocument  = [];

     await documents.forEach(async (doc: any) => {
        
     const buffer = doc.buffer;
     const filename = 'data/research/' + crypto.randomUUID() + doc.originalname;
     filepaths.push({path:filename,filename:doc.originalname});

   
     const awsData : AwsData  = await uploadResearchToS3(filename , buffer);
     let path : string = String(awsData.key)
     console.log('aws return data',awsData)
  
    });

    return filepaths;

  } catch (error) {
    console.error(`Error saving file`, error);
    throw error; 
  }
}

async function uploadResearchToS3(filename: string, fileContent: Buffer) : Promise<AwsData> {
    return new Promise((resolve,reject)=>{

    const params : AWS.S3.PutObjectRequest = {
        Bucket: process.env.bucketName || '',
        Key: filename,
        Body: fileContent
    };

    console.log("BucketXXXXX",params);

    // Upload the image to the S3 bucket
    s3.upload(params, function(err: Error, data: AWS.S3.ManagedUpload.SendData) {
        if (err) {
            console.log('Error uploading image:', err);
            reject(err)
        } else {
            console.log('File uploaded successfully. Location:', data);
            let awsData: AwsData = {
                    ETag: data.ETag ??  '',
                    ServerSideEncryption: '', 
                    Location: data.Location ?? '',
                    key: data.Key ?? '',
                    Key: data.Key ?? '',
                    Bucket: data.Bucket ?? '',
                };
                resolve(awsData);
        }
    });

  
})

}
