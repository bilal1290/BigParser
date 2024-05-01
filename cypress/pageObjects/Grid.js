import gridLocators from '../locators/gridLocators'

var uniqueID = 'id' + (new Date()).getTime();

export function createGridWithUI (gridData){

    // User is able to click on create-grid card after login into app
    cy.get(gridLocators.create.createGridButton).should('be.visible').click()

    // Verify create grid dialog is visible by verifying its title
    cy.get(gridLocators.create.gridDailogTitle).should('contain.text','Create new Grid')

    // User should be able to verify and fill all details in dialog text fields
    cy.get(gridLocators.create.gridNameField).should('be.visible').type(gridData.name+uniqueID) // used fixture and locators
    cy.get(gridLocators.create.gridDescTextArea).should('be.visible').type(gridData.desc)

    // Click Create button in dialog box to create grid
    cy.get(gridLocators.create.createButton).should('not.be.disabled').click()

}

export function createGridWithAPI(name,desc){
    // Create a post request to create a grid using API
    cy.request({
        method: 'POST',
        url: 'https://www.bigparser.com/api/v2/grid/create_grid',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('oAuth_user_access_token')}` // Extracted Bearer-Token from localStorage
        },
        body:{"gridName":name,"gridDescription":desc}
    }).then(response=>{

        cy.log(JSON.stringify(response.body))

    })
}

export function deleteGridWithApi(gridID){
    // created a request to delete grid using api along bearer token from localStorage
    cy.request({
        method: 'DELETE',
        url: `https://www.bigparser.com/api/v2/grid/${gridID}/delete_grid`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('oAuth_user_access_token')}` // Extracted Bearer-Token from localStorage
        }
    }).then(data => {
        cy.log(JSON.stringify(data))
        expect(data.status).to.eq(200)
     })
}

export function searchAndOpenGrid(gridName){

    cy.get(gridLocators.search.globalSearchField).should('be.visible').type(gridName)

    cy.get(`div[title="${gridName}"`).should('be.visible').click()

}

export function deleteGridWithUI(){
    // Clicked on dorpdown from header
    cy.get(gridLocators.actions.dropdown).should('be.visible').click()

    //Clicked on delete button from dropdown list
    cy.get(gridLocators.actions.deleteButton).should('be.visible').click()

    // Verifing confirmation box heading
    cy.get(gridLocators.actions.boxHeaderDelete).should('be.visible')

    // Cliccked delete button in last
    cy.get(gridLocators.actions.deleteConfirm).contains('Delete').should('be.visible').click()
  
}