const mongooes = require('mongoose')
const bcrypt = require('bcrypt');



const userSchema = new mongooes.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        required: true
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

const User = mongooes.model('User', userSchema)

module.exports = User