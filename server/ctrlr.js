const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password, email } = req.body,
            db = req.app.get('db');

        const foundUser = await db.check_user({username})
        if(foundUser[0]){
            return res.status(400)>send('Username already in use')
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt)

        const newUser = await db.register_user({ username, hash, email })
        req.session.user = newUser[0]
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const {username, password, email} = req.body,
            db = req.app.get('db');

            const foundUser = await db.check_user({username})
            if(!foundUser[0]){
                return res.status(400).send('Username is incorrect')
            }

            const authenticated = bcrypt.compareSync(password, foundUser[0].password)
            if(!authenticated){
                return res.status(401).send('Password is incorrect')
            }

            delete foundUser[0].password;
            req.session.user = foundUser[0]
            res.status(202).send(req.session.user);
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.status(200);
    },
    // get_post: async(req, res) => {
    //     const {userId} = req.params
    //     if ()
    // }
}