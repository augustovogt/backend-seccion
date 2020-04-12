const BaseRepository = require('./base.repository');
let _comment = null;

class CommentRepository extends BaseRepository{
    constructor({ Comment }){
        super( Comment );
        _comment = Comment;
    }

    async getUserByUsername(username){
        return await _comment.findOne({ username });
    }

}

module.exports = CommentRepository;