import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
