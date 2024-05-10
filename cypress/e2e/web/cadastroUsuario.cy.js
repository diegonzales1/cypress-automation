/* eslint-disable prettier/prettier */
/* eslint-disable import/no-dynamic-require */
const env = Cypress.env('configFile')
const config = require(`../../configs/${env}.json`)
const usuario = require(`../../support/factory/cadastroUsuario`)
const dadosUsuario = usuario.dadosUsuario()

describe('Funcionalidade: Cadastro de usuário', () => {
  beforeEach(() => {
    cy.visit(config.baseUrl)
    cy.title('QAZANDO Shop E-Commerce')
    cy.get('.header-logo').should('be.visible')
    cy.contains('a[href="/login"]', ' Login').click()
  })

  context('Validar campos do cadastro de usuário', () => {
    it('1- Validar campos existentes para cadastro', () => {
      const expectedLabels = ['Nome*', 'E-mail*', 'Senha*']

      cy.get('#createAccount').click()
      cy.get('.account_form h3').contains('Cadastro de usuário').should('be.visible')
      cy.get('.account_form .default-form-box').each(($formBox) => {
        cy.wrap($formBox).find('label').should('exist')
        const labelText = $formBox.find('label').text().trim()
        expect(expectedLabels).to.include(labelText)
      })
      cy.get('#btnRegister').should('have.text', 'Cadastrar')
    })

    it('2- Validar mensagem de obrigatoriedade do campo Nome', () => {
      cy.get('#createAccount').click()
      cy.get('#btnRegister').click()
      cy.get('.account_form').should('contain', 'O campo nome deve ser prenchido')
    })

    it('3- Validar mensagem de obrigatoriedade do campo E-mail', () => {
      cy.get('#createAccount').click()
      cy.get('#user').type(dadosUsuario.name).should('have.value', dadosUsuario.name)
      cy.get('#btnRegister').click()
      cy.get('.account_form').should('contain', 'O campo e-mail deve ser prenchido corretamente')
    })

    it('4- Validar mensagem de obrigatoriedade do campo Senha', () => {
      cy.get('#createAccount').click()
      cy.get('#user').type(dadosUsuario.name).should('have.value', dadosUsuario.name)
      cy.get('#email').type(dadosUsuario.email).should('have.value', dadosUsuario.email)
      cy.get('#btnRegister').click()
      cy.get('.account_form').should('contain', 'O campo senha deve ter pelo menos 6 dígitos')
    })

    it('5- Validar mensagem de obrigatoriedade de 6 dígitos no campo Senha', () => {
      cy.get('#createAccount').click()
      cy.get('#user').type(dadosUsuario.name).should('have.value', dadosUsuario.name)
      cy.get('#email').type(dadosUsuario.email).should('have.value', dadosUsuario.email)
      cy.get('#password').type('12345', { log: false })
      cy.get('#btnRegister').click()
      cy.get('.account_form').should('contain', 'O campo senha deve ter pelo menos 6 dígitos')
    })
  })

  context('Validar cadastro de usuário', () => {
    it('1- Validar cadastro de usuário com sucesso', () => {
      cy.get('#createAccount').click()
      cy.get('#user').type(dadosUsuario.name).should('have.value', dadosUsuario.name)
      cy.get('#email').type(dadosUsuario.email).should('have.value', dadosUsuario.email)
      cy.get('#password').type(dadosUsuario.password, { log: false })
      cy.get('#btnRegister').click()
      cy.get('.swal2-popup').within(($popup) => {
        cy.get($popup).should('contain', 'Cadastro realizado!')
        cy.get($popup).should('contain', `Bem-vindo ${dadosUsuario.name}`)
        cy.wrap($popup).find('button').should('contain', 'OK')
      })
    })
  })
})
