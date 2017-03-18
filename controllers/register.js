var Joi = require('joi');


const registerSchema = Joi.object().keys({
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required()
}).with('email', 'password', 'name');


const handler = (context) => {
    return (req, res) => {

        if (Joi.validate(req.body, registerSchema).error != null) {
            res.sendStatus(400);
            return;
        }

        var found = context.db.users.find({
            email: req.body.email,
            name: req.body.name
        });

        if (found.length) {
            res.sendStatus(400);
            return;
        }
        const user = context.db.users.save(req.body);
        session = context.session.create(user._id)
        res.status(201).send({
            token: "OK"
        });
    }
}

module.exports = (context)=> {
    return handler(context);
}