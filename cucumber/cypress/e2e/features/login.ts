import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("http://localhost:3000/login");
});

When("I enter my valid username and password", () => {
  cy.get('[name="email"]').type("haito@gmail.com");
  cy.get('[name="password"]').type("Haito_123*");
});


When("I click the {string} button", (buttonText: string) => {
  cy.contains("button", buttonText).click();
});

Then("I should be redirected to the main page", () => {
  cy.url().should("include", "/");
});


