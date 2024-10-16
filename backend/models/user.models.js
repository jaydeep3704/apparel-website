import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, // No quotes needed for types
        required: true,
    },
    email: {
        type: String, // No quotes needed for types
        required: true,
        unique: true,
    },
    password: {
        type: String, // No quotes needed for types
        required: true,
    },
    cart: {
        type: Object,
        default: {}, // Initialize cart as an empty object
    },
}, { minimize: false }); // Keep minimize: false to allow empty objects

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
