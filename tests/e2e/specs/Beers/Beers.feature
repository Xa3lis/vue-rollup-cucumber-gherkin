Feature: The Beers

I want to discover Beers

Scenario: I go to Beers page
  Given I go to the main page
  When I click on Give me a beer button
  Then I get a random beer
