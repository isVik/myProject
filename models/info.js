const {Schema, model}= require('mongoose') // Создаем модель, которая сейчас будет работать с БД
const newInfo = new Schema({ // newinfo объект от схемы
    info:{type:String,required:true}, // объект массива
    tooinfo:{type:String,required:true} 
})
module.exports=model('Info', newInfo)
