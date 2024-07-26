import { CustomError } from '$utils/error/customError';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FetchResponse } from 'types/base.types';

interface FetchOptions extends AxiosRequestConfig {}

export async function serverFetch(url: string, options: FetchOptions): Promise<FetchResponse> {


  try {
    const response: AxiosResponse = await axios(url, options);
    console.log('Response:', response);

    const headers: Record<string, string> = {};
    for (const key in response.headers) {
      if (response.headers.hasOwnProperty(key)) {
        headers[key.toLowerCase()] = response.headers[key];
      }
    }

    console.log('Headers in fetchService:', headers);

    let responseBody: any;
    responseBody = response.data; 

    return {
      status: response.status,
      headers,
      body: responseBody,
    };
  } catch (error : any) {
    console.error('Fetch error:', error);
    return {
      status: error.response?.status || 500,
      headers: error.response?.headers || {},
      body: error.response?.data || error.message,
    };
  }
}
