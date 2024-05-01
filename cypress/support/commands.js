// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Created command to login into BigParse with UI
Cypress.Commands.add('loginWithUI', (userId, password) => {

    cy.get('input#loginEmailAddr').should('be.visible').type(userId)
    cy.get('input[name="password"]').should('be.visible').type(password)
    cy.get('input#bp-login').should('be.visible').click()
    cy.get('input.login-btn').should('have.value', 'Login').click()

    // Waiting for login api to be executed successfully upon hiiting above UI actions
    cy.wait('@loginIntercept').then(data => {
        expect(data.response.statusCode).to.eq(200)
    })
})

// Created command to login into BigParse using API also stored tokens in localStorage to access webpage with that
Cypress.Commands.add('loginWithAPI', (userId, password) => {

    cy.request({
        method:'POST',
        url:'https://www.bigparser.com/oauth/bp_login',
        body:{"email":userId,"password":password,"loggedIn":true}
    }).then(response=>{
        cy.log(JSON.stringify(response.body))

        localStorage.setItem('oAuth_user_access_token',response.body.access_token)
        localStorage.setItem('ajs_user_id',response.body.user_id)
    })
})

Cypress.Commands.add('runRoutes', (category) => {

    cy.intercept('POST', '/oauth/bp_login').as('loginIntercept')

    if (category == 'grid') {
        cy.intercept('POST', '/api/v2/grid/create_grid').as('createGrid')
        cy.intercept('DELETE','/api/v2/grid/*/delete_grid').as('deleteGrid')
    }
    else if (category == 'app') {

    }
    else if (category == 'template') {

    }
    else {

    }

})