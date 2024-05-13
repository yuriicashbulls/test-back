const doom = require('./doom');

function assign() {
    let obj = {};

    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        Object.keys(arg).forEach((key) => {
            obj[key] = arg[key];
        });
    }

    return obj;
}

const main = (schema) => {
    return (req, res, next) => {
        let files = req.files || {};

        let data = assign(files, req.params, req.body, req.query);

        const { value, error } = schema.validate(data);
        if (error) {
            return doom.error.validation(res, error);
        }

        req.options = value;
        next();
    };
};

module.exports = {
    main
};
