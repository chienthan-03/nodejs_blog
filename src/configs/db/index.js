const mongoose = require('mongoose')
const sever = '127.0.0.1:27017'
const database = 'f8_education_dev'

const connect = async() => {
    try {
        await mongoose.connect(`mongodb://${sever}/${database}`)
        console.log('Connect successfully!!!')
    } catch (error) {
        console.log('Failed to connect')
        console.log({name: error.name, message: error.message})
    }
}

module.exports = { connect }