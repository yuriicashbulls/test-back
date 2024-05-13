const { StatusCodes } = require("http-status-codes");
const { controller } = require("../../app/helpers");
const service = require("./service");

const integration = {
    twitch: async (req, res) => {
        await controller.sendJson(
            res,
            async () => {
                return await service.integration.twitch({ ...req.options });
            },
            StatusCodes.OK
        );
    }
}

module.exports = {
    integration,
};
