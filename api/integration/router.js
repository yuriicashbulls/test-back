const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');

const controller = require('./controller');
const { validator } = require('../../app/helpers');
const { schemas } = require('./validator');


router.post(
    '/twitch',
    validator.main(schemas.router.twitch),
    asyncHandler(controller.integration.twitch)
);

router.post(
    '/twitch-callback',
    asyncHandler((req, res) => {
        try {
            console.log(req.body)
            const challenge = req.body.challenge;
            res.status(200).type('text/plain').send(challenge);
        } catch (error) {
            console.error("Error handling Twitch webhook:", error);
            res.status(500).send("Internal Server Error");
        }
    })
);

module.exports = router;
