const integration = require('../../api/integration/router');


module.exports = {
    API: (app) => {
        app.use('/api/integration', integration);
    }
};
