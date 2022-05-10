const mongoose =require ("mongoose")
const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.linkdb)
        console.log("database connected")
    } catch (error) {
        console.log("failed to connect")
        
    }
}

module.exports=connectdb