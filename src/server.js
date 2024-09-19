import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './helpers/env.js';
import { fillTheMDB } from './services/eventService.js';
import errorHandler from './middleware/errorHandler.js'
import notFoundHandler from './middleware/notFoundHandler.js'
import router from './routes/eventRouter.js';

const PORT = Number(env('PORT'));

const oneHour = 60*60*1000

export const setupServer = async () => {
    const app = express();

    // app.use(
    //     pino({
    //       transport: {
    //         target: 'pino-pretty',
    //       },
    //     }),
    //   );

    app.use(cors());
    app.use(express.json());
    app.use(router);
    app.use('*', notFoundHandler);

    app.use(errorHandler);

    setInterval(fillTheMDB, oneHour)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
};
