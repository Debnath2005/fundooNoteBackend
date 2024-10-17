/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
//import { log } from 'winston';
import Note from '../models/note.model'
import HttpStatus from 'http-status-codes';
//import jwt from 'jsonwebtoken';

export const createNote=async(body)=>{
    const data=await Note.create(body)
    if(data){
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message: 'Note SuccessFully Created !'
        }
    }
    else{
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:'Note Not Created !'
        }

    }
}

export const getAllNotes=async()=>{
    const data=await Note.find()
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:'Notes is not present !'
        }
    }
    else if(data.length===0){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:data,
            message:'Your notes is not exit !'
        }
    }
    else{
       // await client.set('note_cache',JSON.stringify(data))
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:'Get All Notes SuccessFully !'
        }
    }

}

export const getNoteById= async(id)=>{
    const data= await Note.findById(id);
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:'Notes is not present !'
        }
    }
    else if(data.length===0){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:data,
            message:'Your notes is not exit !'
        }
    }
    else{
       // await client.set('note_cache',JSON.stringify(data))
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:'Get Notes SuccessFully !'
        }
    }
}

export const updateNote= async (id,body)=>{
        const data=await Note.findByIdAndUpdate(id,body)
        if(!data){
            return{
                code:HttpStatus.BAD_REQUEST,
                data:null,
                message:'Notes is not present !'
            }
        }
        else if(data.length===0){
            return{
                code:HttpStatus.BAD_REQUEST,
                data:data,
                message:'Your notes is not exit !'
            }
        }
        else{
            return{
                code:HttpStatus.ACCEPTED,
                data:data,
                message:'Notes SuccessFully Updated!'
            }
        }
} 

export const deleteNote=async(id)=>{
    const data=await Note.findByIdAndDelete(id)
    console.log(data);
    
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:'Notes is not present !'
        }
    }
    // else if(data.length===0){
    //     return{
    //         code:HttpStatus.BAD_REQUEST,
    //         data:data,
    //         message:'Your notes is not exit !'
    //     }
    // }
    else{
       // await client.set('note_cache',JSON.stringify(data))
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:'Notes SuccessFully Deleted!'
        }
    }
}