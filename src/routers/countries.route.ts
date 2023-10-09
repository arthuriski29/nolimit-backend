import { Router } from 'express';
import {getAllCountries, getOneCountry} from '../controllers/country.controller';

export const countryRouter = Router();


countryRouter.get('/', getAllCountries);
countryRouter.get('/:id' , getOneCountry);
