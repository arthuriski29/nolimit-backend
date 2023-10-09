import axios from 'axios';
import { Request, Response } from 'express';
import { findAllQuery, findOneQuery } from '../models/country.model';


const getAllCountries = async (req: Request, res: Response) => {
  try {

    const apiResponse = await axios.post('https://countries.trevorblades.com/graphql', {
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
    
    const apiResponse = await axios.post('https://countries.trevorblades.com/graphql', {
      query: findOneQuery,
      variables: { code: id}
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
      message: `Details of a Country with code ${id}`,
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

