import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I click on Give me a beer button', () => {
  cy.get('[href="#/beers"]').click()
})

Then('I get a random beer', () => {
  cy.get('.beers--description-text').should('exist')
})
