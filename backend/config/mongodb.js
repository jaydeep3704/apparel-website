import mongoose from "mongoose";

const connectDB=async ()=>{
  try {
      mongoose.connection.on('connected',()=>{
          console.log('DB Connected ')
      })
      const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/apparelDB`)
      console.log('DB HOST :',connectionInstance.connection.host)
  
  } catch (error) {
    console.log('connection Failed')
  }
}

export  {connectDB}