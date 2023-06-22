const NewBlogForm = ({
    title, author, url,
    handleTitleChange, handleAuthorChange, handleUrlChange,
    handleSubmit
}) => (
    <>
        <form>
            <div>Title: <input value={title} onChange={handleTitleChange} /></div>
            <div>Author: <input value={author} onChange={handleAuthorChange} /></div>
            <div>Url: <input value={url} onChange={handleUrlChange} /></div>
            <div><button type="submit" onClick={handleSubmit}>add</button></div>
        </form>
    </>
)

export default NewBlogForm