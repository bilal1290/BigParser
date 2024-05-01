const { sqlQuery } = require("../../pageObjects/DBQuery")

describe('Crud Operations fro SQL Database Testing in Cypress', () => {

    it('Create a Table', function () {
        // sqlQuery is called from pageObjects/DBQuery.js
        sqlQuery("CREATE TABLE Persons (PersonID int, FirstName varchar(255), Address varchar(255), City varchar(255))") // Query is added to create table in database
    })

    it('Input Entries into the table', function () {

        // Here we gonna add values in table rows
        sqlQuery(`INSERT INTO Persons (PersonID, FirstName, Address, City) VALUES
        (001, "John", "House No. 01", "Helsinki"),
        (002, "Pam", "House No. 02", "Espoo"),
        (003, "Dwight", "House No. 03", "Lapland"),
        (004, "Michael", "House No. 04", "Vantaa");`).then((result) => {
                expect(result.affectedRows).to.equal(4)
            })
    })

    it('Get and log data from the table', function () {
        sqlQuery(`SELECT * FROM Persons`).then((result) => {
            cy.log(JSON.stringify(result))

            // Verifying if 1st row have same values as we inserted in previous block
            expect(result[0].FirstName).to.equal('John')
            expect(result[0].Address).to.equal('House No. 01')
            expect(result[0].City).to.equal('Helsinki')


        })
    })

    it('Update an Entry into the table and verify', function () {
        sqlQuery(`UPDATE Persons SET FirstName = "Kevin" WHERE City="Vantaa"`).then((result) => {
            expect(result.changedRows).to.equal(1)
        })
        sqlQuery(`SELECT FirstName FROM Persons WHERE City="Vantaa"`).then((result) => {
            expect(result[0].FirstName).to.equal('Kevin')


        })
    })

    it('Verify that there is only one row where the city is Espoo', function () {
       sqlQuery(`SELECT COUNT(*) as "rowCount" FROM Persons WHERE City="Espoo"`).then((result) => {

            expect(result[0].rowCount).to.equal(1)
        })
    })

    it('Delete a Table and Verify', function () {
       sqlQuery(`DROP TABLE Persons`).then((result) => {
            expect(result.message).to.equal("")
        })
    })
})