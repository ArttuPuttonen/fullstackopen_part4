const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    votes: 5,
    __v: 0
  }
]

const listWithMultipleBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    votes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    votes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f0',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    votes: 12,
    __v: 0
  }
]

const listWithMultipleBlogsSameAuthor = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    votes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    votes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f0',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    votes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'First-Class Functions',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD800.html',
    votes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Functional Programming in JavaScript',
    author: 'Michael Chan',
    url: 'https://funcprog.com/',
    votes: 3,
    __v: 0
  }
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total votes', () => {
  test('when list is empty equals zero', () => {
    const result = listHelper.totalVotes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the votes of that', () => {
    const result = listHelper.totalVotes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs equals the votes of all', () => {
    const result = listHelper.totalVotes(listWithMultipleBlogs)
    expect(result).toBe(24)
  })
})

describe('favorite blog', () => {
  test('when list is empty, return null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog, return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      votes: listWithOneBlog[0].votes
    })
  })

  test('when list has multiple blogs, return the one with most votes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual({
      title: listWithMultipleBlogs[2].title,
      author: listWithMultipleBlogs[2].author,
      votes: listWithMultipleBlogs[2].votes
    })
  })
})

describe('most blogs', () => {
  test('when list is empty, return null', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog, return the author of that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1
    })

  }
  
    )
  test('when list has multiple blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogsSameAuthor)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 3
    })
  }
  )
})    
  

describe ('most votes', () => {
  test('when list is empty, return null', () => {
    const result = listHelper.mostVotes(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog, return the author of that blog', () => {
    const result = listHelper.mostVotes(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      votes: 5
    })
  }
  )
  test('when list has multiple blogs, return the author with most likes', () => {
    const result = listHelper.mostVotes(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      votes: 17
    })
  }
  )
})