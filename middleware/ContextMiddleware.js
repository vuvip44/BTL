const {asyncLocalStorage}=require('../util/RequestContext');
const contextMiddleware = (req, res, next) => {
    asyncLocalStorage.run({}, () => {
        next();
    });
};

module.exports = contextMiddleware;