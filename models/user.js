const {Schema, model}= require('mongoose') // Создаем модель, которая сейчас будет работать с БД
const newUser = new Schema({ //newuser, объект от схемы
    username:{type:String,required:true}, // объект массива
    password:{type:String,required:true},
    admin:{type:Boolean,default:false}
})
module.exports=model('User', newUser)

// таким образом когда мы сохдаем сессию мы добавляем в не ище один парапетр исадминки и присваиваем ей зничение
// и бъекта юзер в его поле админ которое имеет постоянное значение = false
//boolean с большой буквой 1 опция, по дефолту default:false
// таких образом когда создаем сессию, мы добавляем в нее еще 1 параметр, который назвали isAdminka 
// и присваиваем знач. из объекта user в его поле админ, которое имеет постоянное значение false