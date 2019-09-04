const users = require('../../userData.json')
module.exports = {
    getUsers: (req, res, next) => {
        const { age, email, favorites } = req.query
        if (age) {
            const usersUnderAge = users.filter(el => {
                return el.age < age
            })
            return res.status(200).send(usersUnderAge)
        }
        if (email) {
            const usersEmail = users.filter(el => {
                return el.email === email
            })
            return res.status(200).send(usersEmail)
        }
        if (favorites) {
            let favoritesArr = []
            for(let i = 0; i < users.length; i++) {
              let user = users[i].favorites.filter(el=>{
                  return el === favorites
               })
               if (user.length > 0) {
                favoritesArr.push(users[i])
               }
            }
                return res.status(200).send(favoritesArr)
        }
        res.status(200).send(users)
    },
    getUserById: (req, res, next) => {
        let { userId } = req.params
        userId = +userId
        const user = users.filter(el => {
            return el.id === userId
        })
        if (user.length > 0) {
            return res.status(200).send(user)
        }
        else {
            return res.status(404).send({ message: "no user found" })

        }
    },
    getAdmins: (req, res, next) => {
        const admins = users.filter(el => {
            return el.type === "admin"
        })
        res.status(200).send(admins)
    },
    getNonAdmins: (req, res, next) => {
        const nonAdmins = users.filter(el => {
            return el.type !== "admin"
        })
        res.status(200).send(nonAdmins)
    },
    getByType: (req, res, next) => {
        const { type } = req.params
        const userType = users.filter(el => {
            return el.type === type
        })
        res.status(200).send(userType)
    },
    updateByUserId: (req, res, next) => {
        const {userId} = req.params
        const newarray = users.filter(el=> {
            return el.id !== +userId
        })
        const updatedUser = req.body
        updatedUser['id'] = +userId
            newarray.unshift(updatedUser)
            res.status(200).send(newarray)
    },
    createUser: (req,res,next) => {
            let newid = 0
            for(let i = 0; i<= users.length; i ++){
                if(users[i].id > newid) {
                    newid = users[i].id
                }
            }
            newid++
            const newUser = req.body
            newUser['id'] = newid
            users.unshift(newUser)
            res.status(200).send(users)
    },
    deleteUser: (req,res,next) => {
        const {userId} = req.params
        const removeUser = users.filter((el,i)=> {
        if(el.id === +userId) {
            users.splice(i,1)
        }
        })
        console.log(userId)
        res.status(200).send(users)
    }
}