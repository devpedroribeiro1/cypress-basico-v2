// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {
        cy.visit('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
})