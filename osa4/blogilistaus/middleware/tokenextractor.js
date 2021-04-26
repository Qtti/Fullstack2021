const tokenExtractor = (request, response, next) => {
    
    const authorization = request.get('authorization')
    response.token = ''
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        response.token = authorization.substring(7)
    }
    
    console.log('token:', response.token)
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

module.exports = tokenExtractor