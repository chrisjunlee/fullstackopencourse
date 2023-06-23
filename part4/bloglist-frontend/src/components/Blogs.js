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
                <div key={b.id} style={blogStyle}>
                    {b.title} :: {b.author}
                    <button onClick={() => handleDeleteBlog(b.id)}>DELETE</button>
                    <Togglable buttonLabel="View" buttonLabelCancel="Hide">
                        <div>{b.url} <br />
                            {b.likes} <button onClick={() => handleLike(b)}>Like</button><br />
                            {b.user.username}</div>
                    </Togglable>
                </div>
            )}
        </>
    )
}

export default Blogs