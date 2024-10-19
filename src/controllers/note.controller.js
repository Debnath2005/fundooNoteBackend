/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const createNote = async (req, res) => {
  try {
    const data = await NoteService.createNote(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code:HttpStatus.INTERNAL_SERVER_ERROR,
        data:[],
        message:error
    })
  }
};

export const getAllNotes= async(req,res)=>{
    try {
        const data= await NoteService.getAllNotes(req.body)
        if(data){
            res.status(data.code).json({
                code:data.code,
                data:data.data,
                message:data.message,
            });
        }
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            data:[],
            message:error
        })
    }
}

export const getNoteById= async(req,res)=>{
    try {
        const data= await NoteService.getNoteById(req.params.id)
        if(data){
            res.status(data.code).json({
                code:data.code,
                data:data.data,
                message:data.message,
            });
        }
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            data:[],
            message:error
        })
    }
}

export const updateNote= async(req,res)=>{
    try {
        const data=await NoteService.updateNote(req.params.id,req.body)
        if(data){
            res.status(data.code).json({
                code:data.code,
                data:data.data,
                message:data.message,
            });
        }
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            data:[],
            message:error
        })
    }
}

export const deleteNote=async(req,res)=>{
    try {
        const data= await NoteService.deleteNote(req.params.id)
        if(data){
            res.status(data.code).json({
                code:data.code,
                data:data.data,
                message:data.message,
            });
        }
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            data:[],
            message:error
        })
    }
}