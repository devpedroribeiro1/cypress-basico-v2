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
        cy.clock()
        cy.contains('button', 'Enviar').click();
        cy.get('span[class="error"]').should('be.visible')
        cy.tick(3001)
        cy.get('span[class="error"]').should('not.be.visible')
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
        cy.clock()
        cy.contains('button', 'Enviar').click();
        cy.get('span[class="error"]').should('be.visible')
        cy.tick(3001)
        cy.get('span[class="error"]').should('not.be.visible')
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
        cy.clock()
        cy.contains('button', 'Enviar').click();
        cy.get('span[class="error"]').should('be.visible')
        cy.tick(3001)
        cy.get('span[class="error"]').should('not.be.visible')
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

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]').check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each((element) => {
                cy.wrap(element)
                    .check()
                    .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .each((element) => {
                cy.wrap(element).check()
                    .should('be.checked')
            })
            .last().uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should((fileInput) => {
                expect(fileInput[0].files[0].name).to.eq('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should((fileInput) => {
                expect(fileInput[0].files[0].name).to.eq('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example').as('exemploJoão')
        cy.get('#file-upload')
            .selectFile('@exemploJoão')
            .should((fileInput) => {
                expect(fileInput[0].files[0].name).to.eq('example')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()
    })

    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('../../src/privacy.html')
            .title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'get',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body).include('CAC TAT')
        })

    })

    // it('encontra o gato', () => {
    //     cy.contains('span', '🐈')
    //         .should('not.be.visible')
    //         .invoke('show')
    // })
})