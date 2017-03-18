module.exports = (context)=> {
    return {
        create: (_user)=> {
            return context.db.sessions.save({ _user: _user })
        },
        deleteAll: (_user)=> {
            context.db.sessions.remove({ _user: _user }, true);
        },
        getAll: (_user)=> {
            return context.db.sessions.find({ _user: _user });
        },
        getSession: (_session) => {
            return context.db.sessions.findOne({ _id: _session });
        }
    }
}