Feature: The Home

I want to access to the home page

Scenario: Access to main page
  Given I go to the main page
  Then The title should be "Hello"

Scenario: I visit "About page"
  Given I go to the main page
  When I click on the about link
  Then I should see the "about" page
  