describe('Blog ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Jukka',
            username: 'jukkak',
            password: 'salainen'
          }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        
        cy.visit('http://localhost:3000')
      })
    
    it('Login form is shown', function() {
        
        cy.contains('Log in to application')
        cy.contains('Username')
    })

    it('Login', function() {
        cy.contains('Log in').click()
        cy.get('#username').type('jukkak')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('Jukka logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('Log in').click()
        cy.get('#username').type('jukka')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.contains('wrong credentials')
      })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('Log in').click()
            cy.get('#username').type('jukkak')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
    
            cy.contains('Jukka logged in')
        })

        it('A blog can be created', function() {
            cy.get('#showaddblog-button').click()
            cy.get('#title-newblock').type('testtitle')
            cy.get('#author-newblock').type('testauthor')
            cy.get('#url-newblock').type('url')
            cy.get('#createblog-button').click()

            cy.contains('testtitle')
            cy.contains('testauthor')
        })
    })
})