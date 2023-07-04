const NewBlogForm = ({
    title, author, url,
    handleTitleChange, handleAuthorChange, handleUrlChange,
    handleSubmit
}) => (
    <>
        <form>
            <div>Title: <input id='newTitle' value={title} onChange={handleTitleChange} /></div>
            <div>Author: <input id='newAuthor' value={author} onChange={handleAuthorChange} /></div>
            <div>Url: <input id='newUrl' value={url} onChange={handleUrlChange} /></div>
            <div><button type="submit" onClick={handleSubmit}>add</button></div>
        </form>
    </>
)

export default NewBlogForm