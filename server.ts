import express from 'express';
// import { graphqlHTTP } from 'express-graphql';
// import { buildSchema } from 'graphql';
import axios from 'axios';

const server = express();
const port = 5000;

server.get(
  '/',
  (req, res) => {
    return res.json({
      success: true,
      message: 'Server for GraphQL Test Nolimit is running'
    });
  }
);

server.get(
  '/countries', 
  async (req, res) => {
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
      res.json(responseData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });

server.get(
  '/countries/:id',
  async (req, res) => {
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
  });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
