import axios from 'axios';
const apiUrl = 'https://countries.trevorblades.com/graphql';

export const http = (query: string, variables: object = {}) => {
  return axios.post(apiUrl, {
    query: query,
    variables: variables
  });
};
