
export const findAllQuery = `
    query GetCountry {
      countries {
        name
        languages {
          name
        }
      }
    }
  `;
export const findOneQuery = `
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
