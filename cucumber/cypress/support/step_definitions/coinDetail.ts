import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

beforeEach("I am on the home page", () => {
  cy.visit("/");
});

Given("I am on the home page", () => {
  //   cy.visit("/");
});

When("I click on the {string} coin", (coin) => {
  cy.contains("span", coin).should("exist");
  cy.contains("span", coin).closest('[id="dragDropClosest"]').click();
});

Then("I should be redirected to {string}", (url) => {
  cy.url().should("include", url);
});

