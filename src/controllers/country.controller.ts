import axios from 'axios';
import { Request, Response } from 'express';
import { findAllQuery, findOneQuery } from '../models/country.model';

const apiUrl = 'https://countries.trevorblades.com/graphql';

const getAllCountries = async (req: Request, res: Response) => {
  try {

    const apiResponse = await axios.post(apiUrl, {
      query: findAllQuery,
    });
    if (!apiResponse) {
      return res.json({
        success: false,
        message: 'Api Url Is not connected'
      });
    }

    const responseData = apiResponse.data.data;
    return res.json({
      success: true,
      message: 'List of All Countries',
      results: responseData
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'An error occurred while getAll data'
    });
  }
};

const getOneCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const alphRegex = /^[a-zA-Z]+$/;
    const checkAlp = alphRegex.test(id) === false; 
    const checkLength1 = id.length >2;
    const checkLength2 = id.length === 1;
    const msgCheckLength = 'Country code has to have 2 character!';
    const msgCheckAlp = 'Country code must be in Alphabet!';

    if((checkAlp && checkLength1) || (checkLength2 && checkAlp)) {
      return res.json({
        success: false,
        message: [
          msgCheckAlp,
          msgCheckLength
        ]
      });
    }
    if(checkLength1 || checkLength2) {
      return res.json({
        success: false,
        message: [
          msgCheckLength
        ]
      });
    }
    if (checkAlp){
      return res.json({
        success: false,
        message: [
          msgCheckAlp
        ]
      });
    }

    const apiResponse = await axios.post(apiUrl, {
      query: findOneQuery,
      variables: { code: id && id.toUpperCase()}
    });
    if (!apiResponse) {
      return res.json({
        success: false,
        message: 'Api Url Is not connected'
      });
    }

    const responseData = apiResponse.data.data;

    if(responseData.country === null){
      return res.json({
        success: true,
        message: `No Country found with code ${id.toUpperCase()}`,
        results: responseData
      });
    }
    return res.json({
      success: true,
      message: `Details of a Country with code ${id.toUpperCase()}`,
      results: responseData
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'An error occurred while getOne data' 
    });
  }
};

export {getAllCountries, getOneCountry};

