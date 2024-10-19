/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const newUser = async(req,res)=>{
  try {
    const data= await UserService.newUser(req.body);
    res.status(data.code).json({
       code:data.code,
       data:data.data,
       message:data.message,
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      data:[],
      message:error
    })

  }
}

export const loginUser = async(req,res)=>{
  try {
    const data= await UserService.loginUser(req.body);
  res.status(data.code).json({
    code:data.code,
    data:data.data,
    message:data.message,

 });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:error
    })
  }
}

export const forgetPassword= async(req,res)=>{
    try {
      const data=await UserService.forgetPassword(req.body)
      res.status(data.code).json({
        code:data.code,
        data:data.data,
        message:data.message,
      })
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        code:HttpStatus.BAD_REQUEST,
        data:null,
        message:error
      })
    }
}

export const resetPassword= async(req,res)=>{
  try {
    const data=await UserService.resetPassword(req.body);
    res.status(data.code).json({
      code:data.code,
      data:data.data,
      message:data.message,
    })
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:error
    })
  }
}