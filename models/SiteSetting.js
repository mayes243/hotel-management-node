const mongoose = require('mongoose');

const siteSettingSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Site Settings must have a title.']
    },
    subTitle: {
        type: String
    },
    contactPerson: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    description:{
        type: String
    },
    logo: String,
    favicon: String,
    facebook: String,
    twitter: String,
    instagram: String,
    youtube: String,
    sudo:{
        type: String,
        select: false,
        default: 'main',
        unique: true
    }

});

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);
module.exports = SiteSetting;