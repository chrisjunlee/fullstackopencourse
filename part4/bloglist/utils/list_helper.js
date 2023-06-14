const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((champ, blog) => champ.likes < blog.likes ? blog : champ, blogs[0])
}

const mostBlogs = (blogs) => { 
    let partitioned = partition(blogs)
    let result = partitioned.reduce((champ, author) => champ.blogs < author.blogs? author : champ, partitioned[0])
    console.log('res', result)
    return { author: result.author, blogs: result.blogs }
}

const mostLikes = (blogs) => { 
    let partitioned = partition(blogs)
    let result = partitioned.reduce((champ, author) => champ.likes < author.likes ? author : champ, partitioned[0])
    return { author: result.author, likes: result.likes }
}

const partition = (blogs) => {
    // schema: {author: blogs: likes:}
    let result = []

    for(const blog of blogs) {
        let author = result.find(ele => ele.author == blog.author)

        if(author) {
            author.likes += blog.likes
            author.blogs += 1
        }
        else {
            result = [...result, { author: blog.author, blogs: 1, likes: blog.likes}]
        }
    }
    return result
}

module.exports = {
    totalLikes, favoriteBlog, mostBlogs, mostLikes
}