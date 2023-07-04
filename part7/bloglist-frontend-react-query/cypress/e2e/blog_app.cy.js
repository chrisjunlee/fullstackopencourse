describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    // creating test user
    const testUser = {
      "username": "testuser1",
      "name": "testusername1",
      "password": "testpassword1"
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
  })

  // 5.17: checking application displays login form by default
  it('Login form is shown', function() {
    cy.contains("Login")
  })

  // 5.18: tests for logging in. successful and unsuccessful
  it('Login unsuccessful', function() {
    cy.contains("Login")
    cy.get('#username').type('use1')
    cy.get('#password').type('pass1')
    cy.get('#login-button').click()
    cy.get('.error').contains('Wrong Credentials')
  })

  it('Login successful', function() {
    cy.contains("Login")
    cy.get('#username').type('testuser1')
    cy.get('#password').type('testpassword1')
    cy.get('#login-button').click()
    cy.get('#loggedinBanner').contains('testuser1 logged in')
  })

  // 5.19: verify logged-in user can create new blog
  describe('When logged in', function() {
     beforeEach(function() {
      // log in user here
      cy.contains("Login")
      cy.get('#username').type('testuser1')
      cy.get('#password').type('testpassword1')
      cy.get('#login-button').click()
    })

    it('Create new Blog', function() {
      cy.contains("Create").click()
      cy.get('#newTitle').type('new title')
      cy.get('#newAuthor').type('new author')
      cy.get('#newUrl').type('new url')
      cy.contains("add").click()
      cy.contains('new title :: new author')
    })

    // 5.20/5.21: users can like and delete blog.
    it('Liking and deleting Blog', function() {
      cy.contains("Create").click()
      cy.get('#newTitle').type('new title')
      cy.get('#newAuthor').type('new author')
      cy.get('#newUrl').type('new url')
      cy.contains("add").click()
      cy.contains('new title :: new author')

      cy.contains("View").click()
      cy.contains("Likes: 0")
      cy.get('#likesButton').click()
      cy.contains("Likes: 1")

      cy.contains('DELETE').click()
      cy.contains('DELETE').should("not.exist")
      cy.contains('new title').should("not.exist")
    })

    // 5.22/5.23: blogs  ordered according to likes
    it('Blogs Ordered to Likes', function() {
      cy.contains("Create").click()
      cy.get('#newTitle').type('new title')
      cy.get('#newAuthor').type('new author')
      cy.get('#newUrl').type('new url')
      cy.contains("add").click()
      cy.contains('new title :: new author')

      cy.contains("Create").click()
      cy.get('#newTitle').type('new title2')
      cy.get('#newAuthor').type('new author2')
      cy.get('#newUrl').type('new url2')
      cy.contains("add").click()
      cy.contains('new title2 :: new author2')

      // initial order
      cy.get('.blog').eq(0).should('contain', 'new title2 :: new author2')
      cy.get('.blog').eq(1).should('contain', 'new title :: new author')

      // post like order
      cy.get('button:contains("View")').eq(1).click()
      cy.get('button:contains("Like"):visible').click()
      cy.get('.blog').eq(0).should('contain', 'new title :: new author')
      cy.get('.blog').eq(1).should('contain', 'new title2 :: new author2')
    })
  })
})