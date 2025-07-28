import mongoose from 'mongoose';

const database = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to db');
    } catch (error) {
        console.log(error);
    }
}

export default database;