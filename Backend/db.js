import mongoose from 'mongoose';
const mongoURL = 'mongodb://localhost:27017/inotebook';

const connectToMongo = () =>{
    mongoose.connect(mongoURL).then(()=>console.log('Mongo connected!'));
}


export default connectToMongo;