const { createContainer, asClass, asValue, asFunction } = require('awilix');

// Config
const config = require('../config');
//Services

const { HomeService, UserService, IdeaService, CommentsService } = require('../services');

//Controllers
const { HomeController } = require('../controllers');

//Routes
const { HomeRoutes } = require('../routes/index.routes');

// Models
const { User, Idea, Comment } = require('../models');

//Repositories
const {UserRepository, IdeaRepository, CommentRepository} = require('../repositories');

const Routes = require('../routes');

const app = require('.');




const container = createContainer();

container
.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
})
.register({
    HomeService:asClass(HomeService).singleton(),
    UserService:asClass(UserService).singleton(),
    IdeaService:asClass(IdeaService).singleton(),
    CommentsService:asClass(CommentsService).singleton()
}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton()
}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
}).register({
    UserRepository:asClass(UserRepository).singleton(),
    IdeaRepository:asClass(IdeaRepository).singleton(),
    CommentRepository:asClass(CommentRepository).singleton()
});

module.exports = container;
