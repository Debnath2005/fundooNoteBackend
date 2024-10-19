/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/user.sendMailer';

import bcrypt  from 'bcrypt' ;
import dotenv from 'dotenv'

let otp=''

export const newUser = async (body) => {
  const data = await User.findOne({email:body.email} ) ;

  if(data){
    return {
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:'User Already Present !'
    }
  }

 else{

  const hashedPassword= await bcrypt.hash(body.password,4);
  body.password=hashedPassword;
  const user = await User.create(body);

  return {
    code:HttpStatus.ACCEPTED,
    data:user,
    message:'User Succesfully Created !'
  }

 }

}

export const loginUser = async (body) => {

  const data = await User.findOne({ email: body.email });
  if(data===null){
    return {
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: 'User is not registered !',
    };

  }
   const passwordMatch = await bcrypt.compare(body.password, data.password);

   if(!passwordMatch){
     return{
        code:HttpStatus.BAD_REQUEST,
        data:null,
        message:'User Password Is Wrong !',
     };
  }

  const token = jwt.sign({
    userId: data.id,
    email:data.email,
  }, process.env.JWT_SECRET);


  return{
    code:HttpStatus.CREATED,
    data:token,
    message:'User successfully Login',
 };

};

export const forgetPassword= async(body)=>{
  const data= await User.find({email:body.email})
  if(!data){
    return{
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:'User not registered !'
    }
  }
  else{
    for(let i=0;i<5;i++){
      otp+=Math.floor(Math.random()*10);
    }

    const emailOptions = {
      to: body.email,
      subject: 'Welcome to Fundoo App!',
      html: `<h3>Thank you for registering with Fundoo App. Your reset password process started . Please do Not share the otp your OTP : ${otp} </h3>`,
    };

    const emailResult = await sendEmail(emailOptions);
    if(emailResult.success){
      return{
        code:HttpStatus.ACCEPTED,
        data:null,
        message:'Otp Generated Please ckeck your mail !'
      }
    }
    else{
      return{
        code:HttpStatus.BAD_REQUEST,
        data:emailResult.error,
        message:'Forget mail not send to you !'
      }
    }
  }
}

export const resetPassword=async(body)=>{
  const data= await User.findOne({email:body.email})
  //console.log(body);
  if(!data){
    return{
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:'User not registered !'
    }
  }
  else if(otp!==body.otp){
    return{
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:'otp is wrong !'
    }
  }
  else{
    const hashedPassword= await bcrypt.hash(body.newPassword,4);
    data.password=hashedPassword;
    await data.save();
    otp='';
    return{
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'Your Password Succesfully Reset !'
    }
  }
}