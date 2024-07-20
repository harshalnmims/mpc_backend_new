import { promises as fs } from 'fs'; 
import AWS from 'aws-sdk';
import crypto from 'crypto';
import { AwsData } from 'types/base.types';
import { string } from 'zod';
import { SupportingDocument } from 'types/research.master';
import { Request, Response } from 'express';
import AdmZip from 'adm-zip';




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

export async function uploadMultiFile(documents : any) : Promise<SupportingDocument> {
    try {
       
        let filepaths: SupportingDocument  = [];
   
        await documents.forEach(async (doc: any) => {
           
        const buffer = doc.buffer;
        const filename = 'data/research/' + crypto.randomUUID() + doc.originalname;
        filepaths.push({path:filename,filename:doc.originalname,input_abbr:doc.fieldname}
        );
   
      
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



export async function downloadFile(filenames: string[], req: Request, res: Response) {
    if (!filenames || filenames.length === 0) {
        return res.status(400).send('No filenames provided');
    }

    try {
        const zip = new AdmZip();

        for (const filename of filenames) {
            const params: AWS.S3.GetObjectRequest = {
                Bucket: process.env.bucketName || '',
                Key: filename,
            };

            const data = await s3.getObject(params).promise();
            console.log('file names ',filename,data)

            if (data.Body) {
                const buffer = Buffer.isBuffer(data.Body) ? data.Body : Buffer.from(data.Body as string);
                zip.addFile(filename, buffer);
            } else {
                console.warn(`File not found: ${filename}`);
            }
        }

        const zipBuffer = zip.toBuffer();

        const zipFileName = 'downloaded_files.zip';
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);
        res.setHeader('Content-Length', zipBuffer.length.toString());

        res.end(zipBuffer);
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send('Error processing request');
    }
}


