

const { createGridWithUI, deleteGridWithApi } = require('../../pageObjects/grid')
let gridData=require('../../fixtures/grid_data.json')

describe('Grid Test', () => {

  before(()=>{

    // BaseURL is defined in cypress.config.js file
    cy.visit('/')

    // Called Intercept Routes to use later
    cy.runRoutes('grid')

    cy.loginWithUI(Cypress.env('userId'),Cypress.env('password'))
  })
  it('Create Grid with UI and verify with api if grid is created.', () => {

    // Executing createGrid function from pageObjects/Grid.js
    createGridWithUI(gridData)

    // Waiting for createGrid API execution to verify if grid is created
    cy.wait('@createGrid').then(data=>{

      // Verifying success api response as 200
      expect(data.response.statusCode).to.eq(200)
      // Vefying created Grid with its title
      cy.get('.dg-header h1').should('contain.text','GridTestName')

      let gridID=data.response.body.gridId
      
      // Using deleteGridWithApi command from pageObjects/Grid.js to delete created grid
      deleteGridWithApi(gridID)
    })

    
  })
})