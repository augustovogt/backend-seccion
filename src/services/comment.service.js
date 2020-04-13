const BaseService = require('./base.service');
let _commentRepository = null,
_ideaRepository = null;

class CommentService extends BaseService{
    constructor({ CommentRepository, IdeaRepository}){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be send";
            throw error;
        }
        const idea = await _ideaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "idea not found";
            throw error;
        }

        const { comments } = idea;
        return comments;
    }
    async createComments(comments, ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be send";
            throw error;
        }
        const idea = await _ideaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "idea not found";
            throw error;
        }
        const createdComments = await _commentRepository.create(comments); 
        idea.comments.push(createdComments);
        
        return await _ideaRepository.update(ideaId, { comments:idea.comments });
    }
}

module.exports = CommentService;