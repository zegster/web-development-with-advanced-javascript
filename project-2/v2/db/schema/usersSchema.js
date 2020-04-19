/* Load 3rd Party Modules */
const mongoose = require("mongoose");

const usersSchema = mongoose.model("users", {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: { type: String, required: true },
        zipcode: { type: String, required: true },
        geo: {
            lat: { type: mongoose.Types.Decimal128, required: true },
            lng: { type: mongoose.Types.Decimal128, required: true },
        },
    },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    company: {
        name: { type: String, required: true },
        catchPhrase: { type: String, required: true },
        bs: { type: String, required: true },
    },
});

module.exports = usersSchema;
