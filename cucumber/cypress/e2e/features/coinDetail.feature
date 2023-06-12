Feature: Coin Purchase
  As a user
  I want to be able to purchase coins
  So that I can make payments

  Background:
    Given I am on the home page

  Scenario Outline: Click a coin
    Given I am on the home page
    When I click on the "<coin>" coin
    Then I should be redirected to "coin"

    Examples:
      | coin     |
      | Bitcoin  |
      | Ethereum |
      | Polygon  |
      | Kava     |


