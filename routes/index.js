/*
const router = Router() // заставляем Router() быть функцией*/
// const Info = require('../models/info')

//----------------------------------------------------

/*создание указателей для гетовскихи и постовских запросов для маршрутизации */

const headers  = require('../lib/headers')
const {Router} = require('express');
const router = Router()

router.get('/', headers.indexOne)

router.get('/logout', headers.indexTwo)

router.post('/', headers.indexThree)


module.exports = router
















// exports.router = router;

/*
router.get('/',(req, res)=>{
    res.render('index',{ //рендеринг ответа
        title: 'Работа с базой данных',
        isIndex: true
    })
})
*/


/*router.get('/logout', async(req,res)=>{
    req.session.destroy(error=>{ //ошибка запроса на уничтожение сеанса
        if(error)throw error //если ошибка кидает ошибку
        res.redirect('/')
    })
})
*/