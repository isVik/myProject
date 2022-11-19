
//сonst res = require('express/lib/response');

// const Info = require('../models/info')
const {Router} = require('express')
const router = Router()
const headers  = require('../lib/headers')

router.get('/', headers.nextOne)

router.post('/', headers.nextTwo)

module.exports = router
