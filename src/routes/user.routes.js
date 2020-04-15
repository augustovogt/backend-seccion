const { Router } = require ('express');
const { AuthMiddleware, ParseIntMiddleware, CacheMIddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');

module.exports = function({ UserController }){
    const router = Router();

    // router.get("/", [AuthMiddleware, ParseIntMiddleware, CacheMIddleware(CACHE_TIME.ONE_HOUR)], UserController.getAll);
    router.get("/", ParseIntMiddleware, UserController.getAll);
    router.get("/:userId", UserController.get);
    router.patch("/:userId", AuthMiddleware, UserController.update);
    router.delete("/:userId", AuthMiddleware, UserController.delete);
   
    return router;
}