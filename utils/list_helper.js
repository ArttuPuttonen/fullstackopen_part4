const dummy = (blogs) => {
    return 1
  }
  
  const totalVotes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.votes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
  
    const favorite = blogs.reduce((prev, current) => {
      return (prev.votes > current.votes) ? prev : current
    })
  
    return {
      title: favorite.title,
      author: favorite.author,
      votes: favorite.votes
    }
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
  
    const blogCounts = blogs.reduce((counts, blog) => {
      counts[blog.author] = (counts[blog.author] || 0) + 1;
      return counts;
    }, {});
  
    const authorWithMostBlogs = Object.keys(blogCounts).reduce((prevAuthor, currentAuthor) => {
      return blogCounts[prevAuthor] > blogCounts[currentAuthor] ? prevAuthor : currentAuthor;
    });
  
    return {
      author: authorWithMostBlogs,
      blogs: blogCounts[authorWithMostBlogs]
    };
  };

  const mostVotes = (blogs) => {
    if (blogs.length === 0) return null;
  
    const voteCounts = blogs.reduce((counts, blog) => {
      counts[blog.author] = (counts[blog.author] || 0) + blog.votes;
      return counts;
    }, {});
  
    const authorWithMostVotes = Object.keys(voteCounts).reduce((prevAuthor, currentAuthor) => {
      return voteCounts[prevAuthor] > voteCounts[currentAuthor] ? prevAuthor : currentAuthor;
    });
  
    return {
        author: authorWithMostVotes,
        votes: voteCounts[authorWithMostVotes]
    };
    }

  
  module.exports = {
    dummy,
    totalVotes,
    favoriteBlog,
    mostBlogs,
    mostVotes
  }

