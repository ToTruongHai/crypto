import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.intercept("POST", "https://graphql-crypto.onrender.com/graphql").as(
    "apiRequest"
  );
});

Given("I am on the login page", () => {
  cy.visit("http://localhost:3000/login");
});

When("I enter my valid email and password", () => {
  cy.get('[name="email"]').type("haito@gmail.com");
  cy.get('[name="password"]').type("Haito_123*");
});

When("I enter incorrect email or incorrect password", () => {
  cy.get('[name="email"]').type("incorrectEmail@gmail.com");
  cy.get('[name="password"]').type("incorrectPassword");
});

When("I click the {string} button", (buttonText: string) => {
  cy.contains("button", buttonText).click();
  cy.wait("@apiRequest");
});

Then("I should be redirected to the main page", () => {
  cy.url().should("eq", "http://localhost:3000/");
});

Then(
  "I should see an error message indicating that the login failed due to incorrect email or incorrect password",
  () => {
    cy.contains("span", "Email or password is wrong!").should("be.visible");
  }
);

Then(
  "I should remain on the login page to re-enter my email and password",
  () => {
    cy.url().should("include", "/login");
  }
);
