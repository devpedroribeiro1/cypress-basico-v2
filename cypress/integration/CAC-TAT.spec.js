// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('../../src/index.html');
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', async () => {
        const campos = {
            nome: '#firstName',
            sobrenome: '#lastName',
            email: '#email',
            desc: '#open-text-area'
        }
        const preenchimentos = {
            nome: 'Pedro',
            sobrenome: 'Ribeiro',
            email: 'pedro.ribeiro@narwalsistemas.com.br',
            desc: 'Meu computador está lento, preciso de uma nova placa de vídeo com pelo menos 8gb VRAM GDDR6.'
        }

        cy.get(campos.nome)
            .type(preenchimentos.nome);
        cy.get(campos.sobrenome)
            .type(preenchimentos.sobrenome);
        cy.get(campos.email)
            .type(preenchimentos.email);
        cy.get(campos.desc)
            .type(preenchimentos.desc);

        cy.get('button[type="submit"]').click();

        cy.get('span[class="success"]').should('be.visible')


    })
})