import { Router } from 'express';
import {countryRouter} from './countries.route';

export const router = Router();


router.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Server for GraphQL Test Nolimit is running'
  });
});
router.use('/countries', countryRouter);


router.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
});

