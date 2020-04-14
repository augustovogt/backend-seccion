class BaseService {
    constructor(repository){
        this.repository = repository;
    }
    async get(id){
        if(!id){
            const error= new Error();
            error.status = 400;
            error.message = "Id must be send";
            throw error;
        }
        const currentEntity = await this.repository.get(id);
        if(!currentEntity){
            const error= new Error();
            error.status = 404;
            error.message = "Entity not found";
            throw error;

        }
        return currentEntity
        if(!id){
            const error= new Error();
            error.status = 400;
            error.message = " Id must be send";
            throw error;
        }
        const currentIdentity = await this.repository.get(id);

        if(!currentIdentity){
            const error= new Error();
            error.status = 400;
            error.message = "Identity does not found";
            throw error;           
        }

        return currentIdentity;

    }
    async getAll(pageSize, pageNum){
        return await this.repository.getAll(pageSize, pageNum);
    }
    async create(entity){
        return await  this.repository.create(entity);
    }
    async update(id, entity){
        if(!id){
            const error= new Error();
            error.status = 400;
            error.message = " Id must be send";
            throw error;
        }
        
        return await this.repository.update(id,entity);
    }
    async delete(id){
        if(!id){
            const error= new Error();
            error.status = 400;
            error.message = " Id must be send";
            throw error;
        }
        await this.repository.delete(id);  
        return true;      
    }
}

module.exports = BaseService;