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
})