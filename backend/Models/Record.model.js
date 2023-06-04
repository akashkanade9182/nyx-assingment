const mongoose = require("mongoose")

const recordSchema = mongoose.Schema({
    name: {
        type: String

    },
    image: [{ type: String }],
    email: {
        type: String

    },
    age: {
        type: String

    },
    branch: {
        type: String

    },
    addYear: {
        type: String

    },

    mobile: {
        type: String

    },
})

const RecordModel = mongoose.model('records', recordSchema)

module.exports = RecordModel;
