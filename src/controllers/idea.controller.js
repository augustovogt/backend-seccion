let _ideaService = null;

class IdeaController {
    constructor({IdeaService}){
        _ideaService = IdeaService;
    }
    async get(req,res){
        const { ideaId } = req.params;
        const idea = await _ideaService.get(ideaId);
        return res.send(idea);
    }
    async getAll(req,res){
        const { pageSize, pageNum } = req;
        const ideas = await _ideaService.getAll(pageSize, pageNum);
        return res.send(ideas);
    }
    async create(req,res){
        const { body } = req;
        const createdIdea = await _ideaService.create(body);
        return res.status(201).send(createdIdea);
    }
    async update(req, res){
        const { body } = req;
        const { ideaId } = req.params;
        const updatedIdea = await _ideaService.update( ideaId, body);
        return res.send(updatedIdea);
    }
    async delete(req,res){
        const { ideaId } = req.params;
        const ideaDeleted = await _ideaService.delete( ideaId );
        return res.send(ideaDeleted);
    }
    async getUserIdeas(req,res){
        const { userId } = req.params;
        const ideas = await _ideaService.getUserIdeas(userId);
        return res.send(ideas);
    }
    async upvotesIdea(req,res){
        const { ideaId } = req.params;
        const idea = await _ideaService.upvotesIdea(ideaId);
        return res.send(idea);
    }
    async downvotesIdea(req,res){
        const { ideaId } = req.params;
        const idea = await _ideaService.downvotesIdea(ideaId);
        return res.send(idea);
    }    
}

module.exports = IdeaController;