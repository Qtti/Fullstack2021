const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('total likes', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('total notes', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(2)
    })

  test('id correct format', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body
    console.log(contents) 
    contents.map(content => {
        console.log(content) 
        expect(content.id).toBeDefined()
      })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})