const ex = require('express')
        //Express - это минималистичный и гибкий веб-фреймворк для приложений Node. js,
        // предоставляющий обширный набор функций для мобильных и веб-приложений.
// const headers = require('./lib/headers')
const conf = require('config')
        //config организует иерархические конфигурации для развертывания вашего приложения.
const app = ex()
    // const router = express.Router()
    // const { router } = require('./routes/index');

const indexP = require('./routes/index')
const nextP = require('./routes/next')
const aboutP = require('./routes/about')
const loginP = require('./routes/login')

// const indexP = require('./lib/headers')
// const nextP = require('./lib/headers')
// const aboutP = require('./lib/headers')
// const loginP = require('./lib/headers')

const isAuth = require('./middleware/isAuth')
const isAdmin = require('./middleware/isAdmin')

const mongo = require('mongoose')
//то библиотека JS, позволяющая вам определять схемы со строго-типизированными данными.
const handlebars = require('handlebars')
// Handlebars используются для реорганизации пространства на экране и изменения размеров больших блоков пользовательского интерфейса
const ex_hb = require('express-handlebars')
const session = require('express-session')
//набор библиотек который будет хранить данные. несет инфу что сейчас тыкается на сайте. находится в браузере
const saveSes = require('connect-mongodb-session')(session)//...
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
// const express = require("express");
//добавление методов из старых версий хбс


const hbs = ex_hb.create({
    defaultLayout:'main',// макет по умолчанию
    extname:'hbs', //добавочное имя
    handlebars: allowInsecurePrototypeAccess(handlebars)
    //чтобы можно было брать данные с БД, засовывать в переменные и всавлять переменные в шаблоны, вместо инфы об объектах

    //Этот пакет позволяет вам создать новый экземпляр Handlebars,
    // который ведет себя как версия 4.5.3 и позволяет получить доступ к прототипу.
})
app.engine('hbs',hbs.engine)
    // Для создания собственного шаблонизатора воспользуйтесь методом app.engine(ext (hbs),
    // callback (hbs.engine)). ext соответствует расширению имени файла, а callback является функцией шаблонизатора,
    // принимающей в качестве параметров следующие элементы: расположение файла, объект опций и функцию обратного вызова
app.set('view engine','hbs')
app.set('views','views') //путь до файлов сайта

const store = new saveSes({
    collection:"mysession",
    uri:conf.get('uri')
   })
   app.use(session({//конструктор для сессии
    secret:"keys", // ключ по кот. зашифр сетка по строке
       // Вы можете использовать следующие методы для
       // создания зашифрованного текста или для расшифровки зашифрованного текста:
       //Где key находится ключ/пароль, который вы выбрали для использования text,
       // и исходное сообщение, которое вы хотите зашифровать.
    resave:true, // сохраняет сессию в хранилище, даже без изменении в конце запроса;
    saveUnitialized:true, //true сохраняет сессию, false по новой с начала обращается к app.use(session
    store:store //хранилище
    }))

app.use(isAdmin)
app.use(isAuth)

app.use(ex.urlencoded({extended:true}))

app.use('/', indexP)
app.use('/next', nextP)
app.use('/about', aboutP)
app.use('/login', loginP)
    /*app.use(headers.notFound)
    app.use(headers.errorPage)*/
    // app.use('/', router);

const port = conf.get('port')
async function connectTo(){
    try{
        await mongo.connect(conf.get('uri')) //ждём, когда подключится приложение к БД.
        // в качестве ссылки на кластер передаем значение переменной uri в default.json,
        // откуда дергаем его с помощью библиотеки config
        app.listen(port, ()=>{ //начинает прослушивание на этом порту
            console.log(`☕㋛ Это должно работать..
5000♫♪`)
        })
        }
    catch(e){
        console.log(e)
        }}
connectTo()
