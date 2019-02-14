const userDB = require('../../data/helpers/userDb');
const { normalizeUser } = require('./shared');

module.exports = {
    users: async (args) => {  
        try {
            if (args.id) {
                return userDB.getById(args.id).then(user => {
                    return [normalizeUser(user)]
                }).catch(err => {
                    console.log(err)
                })
            } else {
                return userDB.get().then((result) => {
                    return result.map(user => {
                        return normalizeUser(user);
                    });
                }).catch((err) => {
                    console.log(err)
                    throw new Error("Could not fetch users.")
                });
        }
        } catch {
            console.log(err)
            throw err
        }
    },
    createUser: async (args, req) => {
        try {
            const { name } = args.userInput;
            return userDB.insert({name}).then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                throw new Error("Could not create that user.")
            });
        } catch(err) {
            console.log(err)
            throw err
        }
    },
    deleteUser: async (args, req) => {
        try {
            userDB.remove(args.userId).then((result) => {
                if (result < 0) {
                    res.status(404).json({errorMessage: "Could not delete user."})
                } else {
                    res.status(201).json(result)
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).json({errorMessage: "Could not delete user."})
            });
        } catch(err) {
            console.log(err)
            throw err
        }
    }
}