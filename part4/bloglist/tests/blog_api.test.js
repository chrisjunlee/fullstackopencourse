const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

// the initial mongoose connection is handled in app.js...
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog(initBlogs[0]).save()
    await Blog(initBlogs[1]).save()
})

test('Blogs returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/) // regex syntax '/../'
})

test('Blog count is 2', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(2)
})

// Exercise 4.9
test('4.9: Blogs id field is "id"', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
})

// Exercise 4.10: HTTP POST creates new post
test('4.10: Blogs id field is "id"', async () => {
    const newBlog = {
        "title": "TestTitle",
        "author": "TestAuthor",
        "url": "TestURL",
        "likes": 100
    }

    let res = await api.get('/api/blogs')
    const currCount = res.body.length

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(currCount + 1)
})

// Exercise 4.11: missing likes property, default value
test('4.11: Missing likes value assigns default 0', async () => {
    const newBlog = {
        "title": "TestTitle",
        "author": "TestAuthor",
        "url": "TestURL"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const postedBlog = await Blog.findOne({ "title": "TestTitle"})
    console.log('posted:', postedBlog)
    expect(postedBlog.likes).toBeDefined()
    expect(postedBlog.likes).toBe(0)
})

// Exercise 4.12: missing title/url, 400 bad request
test('4.12: Missing title/url returns 400 Bad Request', async () => {
    const newBlog = {
        "author": "TestAuthor",
        "url": "TestURL"
    }

    await api.post("/api/blogs")
        .send(newBlog)
        .expect(400)
})

// Exercise 4.13: DELETE test
test('4.13: DELETE test', async () => {
    const blogs = await api.get('/api/blogs')
    const blogId = blogs.body[0].id 

    await api
        .delete(`/api/blogs/${blogId}`)
        .expect(204)
})

// Exercise 4.14: PUT/Update test
test('4.14: PUT/Update test', async () => {
    const blogs = await api.get('/api/blogs')
    const blogId = blogs.body[0].id 
    const newTitle = "newTitle"

    await api.put(`/api/blogs/${blogId}`)
        .send({"title": newTitle})
        .expect(200)
})

afterAll(async () => {
    await mongoose.connection.close()
})