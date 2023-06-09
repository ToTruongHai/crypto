Feature: Login functionality
  As a user
  I want to be able to login to the application
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter my valid username and password
    And I click the "submit" button
    Then I should be redirected to the main page

