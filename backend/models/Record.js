const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    //company, name, hobby, importantDate, note, additionalNote, family, birthday, reasonOfKnowing, email, position, phoneNumber
    company: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    importantDate: {
        type: Date,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    additionalNote: {
        type: String,
        required: false
    },
    family: {
        type: String,
        required: false
    },
    reasonOfKnowing: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Record', recordSchema)