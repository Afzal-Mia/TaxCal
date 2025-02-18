import mongoose from "mongoose";
function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log('Database is connected')
    }
     catch(e){
        console.log("couldn't connect to the database",e.message);
     }
}
export {connectDB};