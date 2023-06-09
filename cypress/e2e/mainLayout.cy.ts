describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Find cryptocurrencies!", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("body", "cryptocurrencies");
  });

  it("Test Login!", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("a", "Sign in").click();
    cy.url().should("include", "/login");
    cy.get('[name="email"]').type("haito@gmail.com");
    cy.get('[name="password"]').type("Haito_123*");
    cy.contains("button", "submit").click();
    cy.url().should("include", "/");
    cy.get('[cy-profile="user"]').click();
    cy.contains("a", "User Profile");
  });
});
