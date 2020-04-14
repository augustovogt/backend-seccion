const mcache = require('memory-cache');
const { CACHE_KEY } = require('../config');

module.exports = function(duration){
    return (req, res, next)=>{
        const key = CACHE_KEY + req.originalUrl || req.Url;
        const cacheBody = mcache.get(key);
        if(cacheBody){
            return res.send(JSON.stringify(cacheBody));
        } else {
            res.sendResponse = res.send;
            res.send = body => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    }
}
