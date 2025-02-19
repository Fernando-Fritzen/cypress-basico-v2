/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Fernando");
    cy.get("#lastName").type("Fritzen");
    cy.get("#email").type("fernandofritzen9@gmail.com");
    cy.get("#open-text-area").type(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae distinctio ipsam pariatur. Natus accusamus repellendus impedit ex in asperiores quo, recusandae eius quis! At soluta nostrum veritatis itaque fuga laborum!",
      { delay: 0 }
    );
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Fernando");
    cy.get("#lastName").type("Fritzen");
    cy.get("#email").type("fernandofritzen9@gmail,com");
    cy.get("#open-text-area").type(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae distinctio ipsam pariatur. Natus accusamus repellendus impedit ex in asperiores quo, recusandae eius quis! At soluta nostrum veritatis itaque fuga laborum!",
      { delay: 0 }
    );
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it("Campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Fernando");
    cy.get("#lastName").type("Fritzen");
    cy.get("#email").type("fernandofritzen9@gmail.com");
    cy.get("#open-text-area").type("Teste");
    cy.get("#phone-checkbox").check();

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Fernando")
      .should("have.value", "Fernando")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Fritzen")
      .should("have.value", "Fritzen")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("fernandofritzen9@gmail.com")
      .should("have.value", "fernandofritzen9@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone").type("123455").should("have.value", "123455").clear();
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });
  it("Seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]#file-upload')
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});
