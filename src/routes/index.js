const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { NotFoundMiddleware, ErrorServerMiddleware } = require('../middlewares');

require('express-async-errors');

module.exports = function({ HomeRoutes }){
    const router = express.Router();
    const apiRouter = express.Router();

    apiRouter
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    apiRouter.use("/home", HomeRoutes);
    router.use("/v1/api", apiRouter);

    router.use(NotFoundMiddleware);
    router.use(ErrorServerMiddleware);
    
    return router;
    
}