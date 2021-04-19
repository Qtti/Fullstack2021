const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



const initialList = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }]

  

describe('total likes', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialList)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('total notes', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialList.length)
    })

  test('id correct format', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body
    contents.map(content => {
        expect(content.id).toBeDefined()
      })
  })

  test('add one & likes 0 or greater', async () => { 
    
    const oneBlog = 
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
    .post('/api/blogs')
    .send(oneBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialList.length + 1)

    const contents = response.body
    contents.map(content => {
      expect(content.likes).toBeGreaterThanOrEqual(0)
    })
  })

  test('add one without title & url', async () => {
    const oneBlog = 
    {
        author: 'Edsger W. Dijkstra',
    }

    await api
    .post('/api/blogs')
    .send(oneBlog)
    .expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})