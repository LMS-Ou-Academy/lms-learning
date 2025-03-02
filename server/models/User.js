import mongoose from 'mongoose';
import express from 'express'
const userSchema = new mongoose.Schema(
  {
    _id:{type:String, requred: true},
    name:{type:String, requred: true},
    email:{type:String, requred: true},
    imageUrl:{type:String, requred: true},
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
  },{timestamps: true});

  const User = mongoose.model('User', userSchema);

  export default User