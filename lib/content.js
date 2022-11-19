const content = [
    'This my page',
    'Its work again',
    'a lot of stting',
    'Darova',
    'true connect'
]

exports.getContent = () => {
    const idx = Math.floor(Math.random()*content.length)
    return content[idx]
}