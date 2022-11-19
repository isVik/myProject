const {Router} = require("express");
const Info = require('../models/info')
const router = Router() // заставляем Router() быть функцией

const headers  = require('../lib/headers')

router.get('/:id', headers.aboutOne)

router.get('/:id/redact', headers.aboutTwo)

router.post('/redact', headers.aboutThree)

router.post('/delete', headers.aboutFour)

module.exports = router

/*Это module.exports специальный объект,
который по умолчанию включен в каждый файл JavaScript в приложении Node.js.
Это moduleпеременная, представляющая текущий модуль, и exportsобъект,
который будет представлен как модуль.
Таким образом, все, что вы назначите,
module.exports будет отображаться как модуль.
*/

// => приводим к функции