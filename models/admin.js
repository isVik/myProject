const {Schema, model}= require('mongoose') // Создаем модель, которая сейчас будет работать с БД
const admin = new Schema({  // admin объект от схемы
    username:{type:Boolean,default:false}, // объект массива
    password:{type:Boolean,default:false}
})
module.exports = model('admin', admin)


//
