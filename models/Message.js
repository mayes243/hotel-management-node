const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Message must have a name.']
    },
    email:{
        type: String,
        required: [true, 'Message must have a email.']
    },
    phone:{
        type: String,
        required: [true, 'Message must have a phone.']
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;