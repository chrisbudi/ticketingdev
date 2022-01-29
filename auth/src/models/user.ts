import { Password } from './../services/password';
import mongoose from 'mongoose';

//interface that describe the properties
//that are required to create new user 
interface userAttrs {
    email: string,
    password: string;
}


//An interface that describe the properties
//that user Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttrs): UserDoc;
}

//an interface that describe the properties 
// that User document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    // createdAt: string;
    // updatedAt: string;
}

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

userScheme.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userScheme.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};


const User = mongoose.model<UserDoc, UserModel>('User', userScheme);


// const userBuild = User.build({
//     email: 'chris_budi@outlook.com',
//     password: '123456'
// });

// userBuild.email;
// userBuild.password;

export { User };