const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

let token

beforeAll(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'testuser', passwordHash: 'hashedpassword' })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have an id field', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Blog',
    url: 'http://testblog.com',
    votes: 0,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('votes field is set to 0 if not provided', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Blog Without Votes',
    url: 'http://testblogwithoutvotes.com',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const addedBlog = blogs.find(blog => blog.title === 'Test Blog Without Votes')

  expect(addedBlog.votes).toBe(0)
})

test('returns 400 Bad Request if title is missing', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'http://testblog.com',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('returns 400 Bad Request if url is missing', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Blog',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('deletes a blog', async () => {
  const newBlog = new Blog({
    author: 'Author to delete',
    title: 'Title to delete',
    url: 'http://todelete.com',
    user: (await User.findOne({ username: 'testuser' }))._id,
  })

  const savedBlog = await newBlog.save()

  await api
    .delete(`/api/blogs/${savedBlog.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
})

test('updates a blog', async () => {
  const newBlog = new Blog({
    author: 'Author to update',
    title: 'Title to update',
    url: 'http://toupdate.com',
    user: (await User.findOne({ username: 'testuser' }))._id,
  })

  const savedBlog = await newBlog.save()

  const updatedBlog = {
    author: 'Updated Author',
    title: 'Updated Title',
    url: 'http://updatedblog.com',
    votes: 5,
  }

  await api
    .put(`/api/blogs/${savedBlog.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
