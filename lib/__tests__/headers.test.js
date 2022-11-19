// const jest = require('jest')
// import {jest} from '@jest/globals';
// const fn = require('fn')
const headers = require('../headers')
// const {login} = require("../headers");
// const Info = require('../../models/info')

/*test('test render homepage', ()=>{
    const req = {}
    const res = {
        render: jest.fn()
    }

    headers.indexTwo(req,res)
    expect(res.render.mock.calls[0][0]).toBe('index')
})*/

test('test render about whith content', ()=>{
    const req = {}
    const res = {
        render: jest.fn()
    }
    headers.nextTwo(req,res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('next')
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({cont: expect.stringMatching(/\W/)
    }))
})
// toEqual