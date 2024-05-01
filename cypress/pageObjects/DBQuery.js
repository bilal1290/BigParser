

export function sqlQuery (query){

    return cy.task('queryDb', query)

}
