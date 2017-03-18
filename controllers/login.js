var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

handler = (context) => {
    return (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);

            if (user === false) {
                res.status(400).send(info);
                return;
            }
            res.statusCode = 200;
            const session = context.session.create(user._id)
            res.send({
                token: session._id
            });
        })(req, res, next);
    }
};


module.exports = (context)=> {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true
    }, (email, password, done) => {
        var user = context.db.users.findOne({
            email: email
        });

        if (!user) {
            done(null, false, {
                message: 'Incorrect email.'
            });
            return;
        }

        if (password === user.password) {
            done(null, user);
            return;
        }

        done(null, false, {
            message: 'Incorrect password.'
        })
    }));

    context.app.use(passport.initialize());
    context.app.use(passport.session());

    return handler(context)
}