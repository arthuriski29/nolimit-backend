import express from 'express';
import { router } from './src/routers';
import { configDotenv } from 'dotenv';

configDotenv({
  path: '.env',
});

const server = express();
const PORT = process.env.PORT;

server.use('/', router);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
