import Togglable from "./Togglable"

const Blogs = ({ blogs, handleDeleteBlog, handleLike }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <>
            {blogs.map(b =>
                <div key={b.id} class='blog' style={blogStyle}>
                    {b.title} :: {b.author}
                    <button onClick={() => handleDeleteBlog(b.id)}>DELETE</button>
                    <Togglable buttonLabel="View" buttonLabelCancel="Hide">
                        <div>{b.url} <br />
                            Likes: {b.likes} <button id="likesButton" onClick={() => handleLike(b)}>Like</button><br />
                            {b.user.username}</div>
                    </Togglable>
                </div>
            )}
        </>
    )
}

export default Blogs