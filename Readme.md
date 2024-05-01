# Cypress Framework Setup with Page Object Model (POM)

This repository contains a setup guide and structure for implementing Cypress automated tests using the Page Object Model (POM) approach. 

## Prerequisites
- Node.js installed on your machine.
- A code editor of your choice (e.g., Visual Studio Code).

## Getting Started

1. **Clone the Repository:** 


2. **Install Dependencies:**

3. **Folder Structure:**

- **cypress/**
  - **fixtures/** : Contains static test data files usually in JSON formate.
  - **integration/** : Contains test files organized by feature or functionality.
  - **pageObjects/** : Contains Page Object classes.
  - **support/** : Contains reusable custom commands and support files.
  - **pageObjects/** : Contains reusable custom commands and function (Classified in JS files).
- **cypress.config.js** : Cypress configuration file. That contains (1. Env Configuration, 2. baseURL Setup, 3. Browser dimenstions setup, 4. default timeout setup)
- **package.json** : NPM package configuration file.

4. **Page Object Model (POM):**
- Create Page Object classes in the `pageObjects` folder to encapsulate the functionality and locators of each page or component.
- Use the `Locators` folder to store locator constants or functions to fetch locators.

5. **Writing Tests:**
- Write your tests in the `integration` folder using the Page Object classes to interact with the application.
- Follow Cypress best practices for writing effective and maintainable tests. Also here you can follow existing test cases under e2e folder

6. **Run Tests:**
- Run Cypress tests using the Cypress Test Runner:
  ```
  npm run cypress:open
  ```
- Or run tests headlessly using:
  ```
  npm run cypress:run
  ```

7. **Continuous Integration:**
- Integrate Cypress tests into your CI/CD pipeline for automated testing on every deployment.

## Additional Resources
- [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress.html)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html)
- [Page Object Model Pattern](https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/)

