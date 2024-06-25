const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {tokenExtractor, userExtractor} = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        response.status(500).json({ error: 'Server error' })
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})


blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response, next) => {
    const { author, title, url } = request.body
  
    try {
      const user = request.user
      if (!user) {
        return response.status(400).json({ error: 'User does not exist' })
      }
  
      const blog = new Blog({
        author,
        title,
        url,
        votes: 0,
        user: user._id
      })
  
      const savedBlog = await blog.save()
  
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
  
      response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
  })

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response, next) => {
    try {
        const user = request.user;
        const blog = await Blog.findById(request.params.id);

        if (!user || !blog) {
            return response.status(404).json({ error: 'Blog or user not found' });
        }

        if (blog.user.toString() !== user._id.toString()) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    const { title, author, url, votes, user } = request.body;

    const blog = {
        title,
        author,
        url,
        votes,
        user
    };

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;

