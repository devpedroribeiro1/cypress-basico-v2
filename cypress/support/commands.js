// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, desc) => {
    try {
        if(nome == undefined || sobrenome == undefined || email == undefined || desc == undefined){
            throw new Error("Sintaxe incorreta. Utilize: `cy.fillMandatoryFieldsAndSubmit(nome, sobrenome, email, desc)`")
        }
        cy.get('#firstName')
            .type(nome, { delay: 0 });
        cy.get('#lastName')
            .type(sobrenome, { delay: 0 });
        cy.get('#email')
            .type(email, { delay: 0 });
        cy.get('#open-text-area')
            .type(desc, { delay: 0 });

        cy.get('button[type="submit"]').click();
    }
    catch(e){
        cy.log(e.message)
    }
})