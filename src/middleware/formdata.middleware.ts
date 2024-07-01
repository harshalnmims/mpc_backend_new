import FormData from 'form-data';
import { Readable } from 'stream';

export async function formDataToJSON(formData: FormData): Promise<Record<string, any>> {
  const data: Record<string, any> = {};
  
  // Create a readable stream from the FormData
  const formDataStream = Readable.from(formData);

  // Buffer to collect form data
  let buffer = '';

  return new Promise((resolve, reject) => {
    formDataStream.on('data', chunk => {
      buffer += chunk.toString();
    });

    formDataStream.on('end', () => {
      const entries = buffer.split('\n').filter(line => line.trim() !== '');
      
      entries.forEach(entry => {
        const [key, value] = entry.split('=');
        if (key && value) {
          if (key.endsWith('[]')) {
            const cleanKey = key.slice(0, -2); // Remove trailing '[]'
            if (!Array.isArray(data[cleanKey])) {
              data[cleanKey] = [];
            }
            data[cleanKey].push(decodeURIComponent(value));
          } else {
            if (data[key]) {
              if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
              }
              data[key].push(decodeURIComponent(value));
            } else {
              data[key] = decodeURIComponent(value);
            }
          }
        }
      });

      resolve(data);
    });

    formDataStream.on('error', err => {
      reject(err);
    });
  });
}
