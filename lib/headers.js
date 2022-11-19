
const {Router} = require('express')
const content = require('../lib/content')
const router = Router() //          заставляем Router() быть функцией
// const { reset } = require("nodemon")
const Info = require('../models/info')
const User = require('../models/user')
const admin = require('../models/admin')


//---(index.js)---


exports.indexOne= (req, res) => {
    res.render('index',{                    //рендеринг ответа
        title: 'Работа с базой данных',
        isIndex: true,
        // cont : content.getContent()
    })

}

exports.indexTwo = (req,res)=> {
    req.session.destroy(error => {               //ошибка запроса на уничтожение сеанса
        if (error) throw error                      //если ошибка кидает ошибку
        res.redirect('/')
    })
}

exports.indexThree = async(req,res)=> {
    const model = new Info({
        info: req.body.info,
        tooinfo: req.body.tooinfo
    })
    await model.save()
    res.redirect('/next')
}

//---(next.js)---

exports.nextOne = async(req, res)=> {
    const model = await Info.find()
    res.render('next', {
        title: 'Выходной',
        model
    })
}

exports.nextTwo =  (req, res)=> {
    const model = new Info({
        info: req.body.info,
        tooinfo: req.body.tooinfo
    })
     model.save();
    res.redirect('/next');
}



//---(login.js)---

exports.login = (req,res)=>{
    res.render('login',{
        title: 'Авторизация',})
}

// регистрация
exports.Reg = async(req,res)=>{
    try{
        const {username,password,confirm}=req.body // email,password,confirm} имена на hbs фх которые снимаются с бади
        const mbUser=await User.findOne({username}) // хранит записть из БД   ({email}) присим по ключу

        if(mbUser){// если нашел "ткаой есть" (не заменять)
            console.log('Такой есть')
            res.redirect('/login')}// редиректим на логин

        else{ // ести не выполнилось такого нет (происходит запись)
            const user = new User({// создаем новую константу которая заносися в БД
                username,password}) // поля которые заносим в бд
            await user.save() //ждем пока сохранииться
            res.redirect('/login') // обратно на страницу
        }}
    catch(e){console.log(e)}
}

//авторизация
exports.Auth = async(req,res)=>{ // роутер.пост берет данные с формов в .hbs
    try{
        const{username,password}=req.body
        const mbUser=await User.findOne({username}) //find Oneделяет запрос в бд и снимает одиу запись по указанному фильтру {(email})
        if(mbUser){
            const mbPass=password===mbUser.password // == по значению, === по типу данных и значению
            if(mbPass){
                req.session.user = mbUser   //создается сессия для авторизованного пользователя
                req.session.isAuthen=true   //задаем значение переменной на true для отображения новых данных в панели навигации nav.hbs
                req.session.isAdminka=mbUser.admin  // создаем параметр isAdminka в сессии; MbUser.admin  //создается в сесии
                req.session.save(error=>{  //создаем параллельный процесс, чтобы приложение "запнулось" и данные считались
                    if(error)throw error //если (ошибка) выдать ошибку
                    console.log('Авторизовался')
                    res.redirect('/login')
                })
            }else{
                console.log('Неверный пароль')
                res.redirect('/login')}

        }else{
            console.log('Неверная почта')
            res.redirect('/login')
        }
    }catch(e){
        console.log(e)}
}


//---(about.js)---

exports.aboutOne = async(req, res)=>{
    const one = await Info.findById(req.params.id)
    res.render('about',{
        title:"About",
        one
    })
}

exports.aboutTwo = async(req, res)=>{  //
    const mod = await Info.findById(req.params.id) //
    res.render('redact',{
        title:"redact",
        mod
    })
}

exports.aboutThree = async(req,res)=>{
    const{id}=req.body
    delete req.body.id // удаляем с тела сайта
    await Info.findByIdAndUpdate(id, req.body) //поиск по индефикатору и обновлоние
    // нужно 2 параметра (1)на то что мы будем менять (2)второе указание на то куда надо его засунуть
    res.redirect('/')
}
exports.aboutFour = async(req, res)=>{
    await Info.deleteOne({
        id: req.body.id})
    res.redirect('/next')
}

