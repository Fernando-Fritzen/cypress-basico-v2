Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Fernando");
  cy.get("#lastName").type("Fritzen");
  cy.get("#email").type("fernandofritzen9@gmail.com");
  cy.get("#open-text-area").type("Teste");
  cy.contains('button', 'Enviar').click();
});
