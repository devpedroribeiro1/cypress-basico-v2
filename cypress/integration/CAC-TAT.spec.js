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

    it('preenche os campos obrigatórios e envia o formulário', () => {
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
            .type(preenchimentos.nome, { delay: 0 });
        cy.get(campos.sobrenome)
            .type(preenchimentos.sobrenome, { delay: 0 });
        cy.get(campos.email)
            .type(preenchimentos.email, { delay: 0 });
        cy.get(campos.desc)
            .type(preenchimentos.desc, { delay: 0 });

        cy.contains('button', 'Enviar').click();

        cy.get('span[class="success"]').should('be.visible')


    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.contains('button', 'Enviar').click();

        cy.get('span[class="error"]').should('be.visible')
    })

    it('campo de telefone aceita somente números', () => {
        cy.get('#phone').type('valor não numérico').should('be.empty')
    })

    it('exibe mensagem de erro ao submeter o formulário com campo de telefone sendo obrigatorio porém vazio', () => {
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
            .type(preenchimentos.nome, { delay: 0 });
        cy.get(campos.sobrenome)
            .type(preenchimentos.sobrenome, { delay: 0 });
        cy.get(campos.email)
            .type(preenchimentos.email, { delay: 0 });
        cy.get(campos.desc)
            .type(preenchimentos.desc, { delay: 0 });

        cy.get('#phone-checkbox').check();
        cy.contains('button', 'Enviar').click();
        cy.get('span[class="error"]').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
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
            .type(preenchimentos.nome, { delay: 0 })
            .should('have.value', preenchimentos.nome)
            .clear().should('have.value', '')
        cy.get(campos.sobrenome)
            .type(preenchimentos.sobrenome, { delay: 0 })
            .should('have.value', preenchimentos.sobrenome)
            .clear().should('have.value', '')
        cy.get(campos.email)
            .type(preenchimentos.email, { delay: 0 })
            .should('have.value', preenchimentos.email)
            .clear().should('have.value', '')
        cy.get(campos.desc)
            .type(preenchimentos.desc, { delay: 0 })
            .should('have.value', preenchimentos.desc)
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar')
            .click();
        cy.get('span[class="error"]').should('be.visible'); ""
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit('Pedro', 'Ribeiro', 'pedro.ribeiro@nwl.com', 'Meu pc está lento. Preciso de mais RGB!')
        cy.get('span[class="success"]').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube');
    })

    it('seleciona um prduto (Mentoria) por seu texto', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    })
})