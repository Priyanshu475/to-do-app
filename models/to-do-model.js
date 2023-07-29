const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const toDoSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
},{timestamps:true});


const ToDo=mongoose.model('ToDo',toDoSchema);
module.exports=ToDo;

