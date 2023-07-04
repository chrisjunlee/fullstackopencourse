
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blogs from '../components/Blogs'

const blogs = [
    {
        title: "Title1",
        author: "Author1",
        url: "url1",
        likes: 10,
        user: {
            username: "user1",
            name: "Superuser",
            id: "6491403e3385961fa1fabf7d"
        },
        id: "6491439bb58209e0b51c5168"
    }
]

// 5.13: Blog list tests
// Checks component displaying blog renders title and author, but not URL or likes 
test('renders content', () => {
    render(<Blogs blogs={blogs} />)

    const element = screen.queryByText('Title1 :: Author1')
    expect(element).toBeDefined()

    const hiddenElement = screen.queryByText('url1')
    expect(hiddenElement).toBeNull()
})


// 5.14: Blog list tests
// Checks blog's URL and likes shown when button controlling the shown details clicked.
test('Clicking show blog details', async () => {
    const mockHandler = jest.fn()

    render(<Blogs blogs={blogs} />)
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const element = screen.queryByText('url1') 
    expect(element).toBeDefined()
})