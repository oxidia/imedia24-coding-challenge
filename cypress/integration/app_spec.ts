describe("Load list of pokemons", () => {
  it("Should load 50 pokemon", () => {
    cy.visit("http://localhost:3000");
    cy.wait(3000);
    cy.get("main").children().should("have.length", 50);
  });

  it("Should load 100 pokemon after scroll to bottom", () => {
    cy.visit("http://localhost:3000");
    cy.scrollTo("bottom");
    cy.wait(3000);
    cy.get("main").children().should("have.length", 100);
  });

  it("Should load a single pokemon and display some details and close the modal", () => {
    cy.visit("http://localhost:3000");
    cy.wait(3000);
    cy.get("section").first().click();
    cy.wait(1000);
    cy.contains(/height: [0-9]{1,10}/i);
    cy.get("svg").first().click();
    cy.get("div[data-role=modal]").first().should("have.class", "hidden");
  });
});
