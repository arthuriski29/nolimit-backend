import express from 'express';
import { router } from './src/routers';

const server = express();
const port = 5000;

server.use('/', router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
