import { Router } from 'express';
import * as countriesController from '../controllers/country.controller';


export const countryRouter = Router();


countryRouter.get('/', countriesController.getAllCountries);
countryRouter.get('/:id' , countriesController.getOneCountry);
