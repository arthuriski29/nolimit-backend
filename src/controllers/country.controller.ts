import axios from 'axios';
import { Request, Response } from 'express';


const getAllCountries = async (req: Request, res: Response) => {
  try {
    const graphqlQuery = `
    query GetCountry {
      countries {
        name
        languages {
          name
        }
      }
    }
  `;

    const apiResponse = await axios.post('https://countries.trevorblades.com/graphql', {
      query: graphqlQuery,
    });
    const responseData = apiResponse.data.data;
    return res.json(responseData);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

const getOneCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const graphqlQuery = `
      query getOneCountry($code: ID!){
        country (code: $code) {
          awsRegion
          capital
          code
          currencies
          currency
          emoji
          emojiU
          name
          native
          phone
          phones
        }
      }
    `;

    const apiResponse = await axios.post('https://countries.trevorblades.com/graphql', {
      query: graphqlQuery,
      variables: { code: id}
    });

    const responseData = apiResponse.data.data;

    res.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

export {getAllCountries, getOneCountry};

