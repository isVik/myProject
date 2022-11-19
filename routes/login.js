const { Router } = require("express"); //создание объекта маршрутизатор, содержащего методы и свойства Router, как часть библиотеки express
//в фигурных скобках только объект, а не вся библиотеку
const { title } = require("process");
const User = require('../models/user')
const admin = require('../models/admin')
const router = Router()  //используем методы классы Router (get, post)
// заставляем Router() быть функцией
const headers  = require('../lib/headers')

router.get('/', headers.login)

router.post('/reg', headers.Reg) // регистрация

router.post('/auth', headers.Auth) //авторизация

module.exports = router
