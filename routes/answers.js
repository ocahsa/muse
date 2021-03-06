const express = require('express');
const router = express.Router();
const { Question, Answer, User } = require('../db/models')//AComment
const { Op } = require('sequelize')
const { asyncHandler, csrfProtection, userValidators, loginValidators, handleValidationErrors } = require('./utils');
const { requireAuth } = require('./auth');


router.post('/', requireAuth, asyncHandler(async(req, res, next) => {
    const answer = await Answer.create({
        answer: req.body.answer,
        votes: 1,
        question_id: req.body.id,
        user_id: res.locals.user.id
    });

    res.redirect(`/questions/${req.body.id}`);
}));



router.post('/:id(\\d+)/delete', requireAuth, asyncHandler(async(req, res, next) => {
    const answer = await Answer.findByPk(req.params.id)
    await answer.destroy()
    res.redirect(`/questions/${req.body.id}`);
}))

router.post('/:id(\\d+)/edit', requireAuth, asyncHandler(async(req, res, next) => {
    const answer = await Answer.findByPk(req.params.id)
    await answer.update({
        answer: req.body.answer,
    })
    res.redirect(`/questions/${req.body.id}`)
}))

module.exports = router;
