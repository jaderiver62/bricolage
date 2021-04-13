const {
    Schema,
    model
} = require('mongoose');
// Schema for the User model
const UserSchema = new Schema({
    username: {
        type: String,
        unique: "That username already exists, please try a different one.",
        required: "You must enter a username to continue",
        trim: true
    },
    email: {
        type: String,
        required: "Entering an e-mail is required to continue",
        match: [
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            "You must use a valid e-mail address to continue"
        ],
        unique: "This e-mail has already been used, please enter a different e-mail to continue"
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;