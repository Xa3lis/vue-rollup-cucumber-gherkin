import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I go to the main page', () => {
  cy.visit('/')
})

Then('The title should be {string}', title => {
  cy.title().should('include', title)
})

When('I click on the about link', () => {
  cy.get('[href="#/about"]').click()
})

Then('I should see the {string} page', name => {
  cy.get('h1').should('contain', name)
})
