Feature: Login functionality
  As a user
  I want to be able to login to the application
  So that I can access my account

  Background:
    Given I am on the login page

  Scenario: Successful login
    When I enter my valid email and password
    And I click the "submit" button
    Then I should be redirected to the main page

  Scenario: Failed login due to incorrect password
    When I enter incorrect email or incorrect password
    And I click the "submit" button
    Then I should see an error message indicating that the login failed due to incorrect email or incorrect password
    And I should remain on the login page to re-enter my email and password