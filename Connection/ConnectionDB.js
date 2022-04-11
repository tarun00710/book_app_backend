const mongoose = require('mongoose')

const mongoURL = "mongodb+srv://tarun:Tarun%406750@cluster0.ejnzg.mongodb.net/test?authSource=admin&replicaSet=atlas-xw22sa-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const ConnectionDB = async() => {
    try {
        const Connect = await mongoose.connect(mongoURL)
        if(Connect){
            console.log("connected successfully")
        }else{
            console.log("connection failed")
        }
    } catch (error) {
        console.log(error)
    }
   
}

module.exports = {ConnectionDB} 