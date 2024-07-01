// import { promises as fs } from 'fs'; 


// export async function uploadFile(documents : any) {
//  try {

//     const accessKeyId = process.env.accessKeyId;
//     const secretAccessKey = process.env.secretAccessKey;
//     const bucketName = process.env.bucketName;

//      console.log('aws ',accessKeyId,secretAccessKey,bucketName)

//      documents.forEach((doc: { name: any; content: any; }) => {
//         const { name, content } = doc;
//         const base64Data = content.split(',')[1]; // Remove the data URL prefix
//         const buffer = Buffer.from(base64Data, 'base64');

//         const imageName = `NMIMSQP/Testing`;
//         const awsData = Promise.all([uploadResearchToS3(imageName, buffer)]);

//         // Save the file (this is just an example, make sure to handle paths and errors correctly)
//         // const filePath = `./uploads/${name}`;
//         // require('fs').writeFileSync(filePath, buffer);
//         // console.log(`Saved ${name} to ${filePath}`);
//     });

//   } catch (error) {
//     console.error(`Error saving file`, error);
//     throw error; 
//   }
// }

// function uploadResearchToS3(imageName: string, fileContent: Buffer) {
//     return new Promise((resolve,reject)=>{

//     const params = {
//         Bucket: process.env.bucketName,
//         Key: imageName,
//         Body: fileContent
//     };

//     console.log("BucketXXXXX",params);

//     // Upload the image to the S3 bucket
//     s3.upload(params, function(err: any, data: unknown) {
//         if (err) {
//         console.log('Error uploading image:', err);
//             reject(err)
//         } else {
//             console.log('Image uploaded successfully. Location:', data);
//             resolve(data)
//         }
//     });

  
// })

// }
