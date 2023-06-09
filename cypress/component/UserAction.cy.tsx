import UserActions from "@/modules/UserActions";

describe("UserActions component", () => {
  context("when 'id' key is not present in localStorage", () => {
    beforeEach(() => {
      window.localStorage.removeItem("id");
      cy.mount(<UserActions />);
    });

    it("should display 'Sign in' and 'Sign up' links", () => {
      cy.contains("a", "Sign in");
      cy.contains("a", "Sign up");
    });

    it("should not display 'User Profile' link", () => {
      cy.contains("a", "User Profile").should("not.exist");
    });
  });

  context("when 'id' key is present in localStorage", () => {
    beforeEach(() => {
      window.localStorage.setItem("id", "c8e55d06-bf6b-4805-a351-44742ebdd693");
      cy.mount(<UserActions />);
    });

    it("should display 'User Profile' link", () => {
      cy.get('[cy-profile="user"]').click();
      cy.contains("a", "User Profile");
    });

    it("should not display 'Sign in' and 'Sign up' links", () => {
      cy.contains("a", "Sign in").should("not.exist");
      cy.contains("a", "Sign up").should("not.exist");
    });
  });
});
