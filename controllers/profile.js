module.exports = (context)=> {
    return (req, res) => {
            var token = req.headers['authorization'];
            if (token == undefined) {
                res.sendStatus(401);
                return;
            }
            token = token.split(" ")[1];
            const session = context.session.getSession(token)
            var user = context.db.users.findOne({
                _id: session._user
            });
            if (user == null) {
                res.sendStatus(400);
                return;
            }
            delete user.password;
            res.send(user);
        }

}