const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
        on('task', { queryDb: query => { return queryTestDb(query, config) }, }); //For running sql query
    },
    // Defining env variables with values
    env:{
      userId:"qa.abdullah360+cypress@gmail.com",
      password:"Parser@123",
      db: {
        user: "sql6703265",
        host: "sql6.freemysqlhosting.net",
        database: "sql6703265",
        password: "7kNp9cfAnQ",
        port: 3306
        }
    },
    // Defining baseUrl of product
    baseUrl:'https://www.bigparser.com',
    defaultCommandTimeout: 60000,

    // Defining resolution as 1366x720 for web page
    viewportHeight: 720,
    viewportWidth:1366
  },
});
//For connecting to SQL Server
const mysql = require('mysql')
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}
