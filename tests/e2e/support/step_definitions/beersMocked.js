import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I go to the main page mocked', () => {
  cy.server()
  cy.fixture('beer.json').then((data) => {
    cy.route({ method: 'GET', url: 'https://api.punkapi.com/v2/beers/random', response: data, status: 200 }).as('getBeers')
  })
  cy.visit('/')
})

When('I click on Give me a beer button mocked', () => {
  cy.get('[href="#/beers"]').click()
  cy.wait('@getBeers')
})

Then('I see one mocked beer data', () => {
  cy.get('.beers--description-text').should('contain', 'Karma Cloud is a tropical IPA')
})
