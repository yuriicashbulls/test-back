const Joi = require("joi");


const schemas = {
    router: {
        twitch: Joi.object()
            .keys({
                authCode: Joi.string().trim().required(),
            })
            .required()
    }
}

module.exports = {
    schemas
};

