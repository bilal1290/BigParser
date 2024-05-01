

let gridData=require('../../fixtures/grid_data.json')
const { createGridWithAPI, searchAndOpenGrid, deleteGridWithUI } = require('../../pageObjects/grid')

// Generated Unique ID for cocatination with name using timestamp
var uniqueID = 'id' + (new Date()).getTime();
let gridName = gridData.name+uniqueID

describe('Grid Test', () => {

  before(()=>{

    // Called Intercept Routes
    cy.runRoutes('grid')

    // User is logged in using api from commands.js
    cy.loginWithAPI(Cypress.env('userId'),Cypress.env('password'))

  })
  it('Delete Grid with UI and verify with api if grid is created.', () => {
    // Creating grid with API
    createGridWithAPI(gridName,gridData.desc)

    // Visit web-page
    cy.visit('/')

    // Search created grid with UI and open
    searchAndOpenGrid(gridName)

    // Executed delete function for grid
    deleteGridWithUI()

    // Verifing from API if grid is deleted
    cy.wait('@deleteGrid').then(data=>{
      expect(data.response.statusCode).to.eq(200)
    })
  })
})