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
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code:HttpStatus.INTERNAL_SERVER_ERROR,
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
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code:HttpStatus.INTERNAL_SERVER_ERROR,
      data:null,
      message:error
    })
  }

}