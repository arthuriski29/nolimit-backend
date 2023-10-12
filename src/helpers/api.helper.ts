import axios from 'axios';
const apiUrl: string = process.env.API_URL!;

export const http = (query: string, variables: object = {}) => {
  return axios.post(apiUrl, {
    query: query,
    variables: variables
  });
};
