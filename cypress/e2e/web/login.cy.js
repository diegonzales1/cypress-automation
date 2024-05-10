/* eslint-disable prettier/prettier */
/* eslint-disable import/no-dynamic-require */
const env = Cypress.env('configFile')
const config = require(`../../configs/${env}.json`)

describe('Funcionalidade: Login', () => {
  beforeEach(() => {
    cy.visit(config.baseUrl)
    cy.title('QAZANDO Shop E-Commerce')
    cy.get('.header-logo').should('be.visible')
    cy.contains('a[href="/login"]', ' Login').click()
  })

  context('Validações dos campos de login', () => {
    it('1- Validar campos existentes para o login', () => {
      cy.get('.account_form').within(() => {
        // Valida Existencia dos campos Email e Senha
        cy.get('.default-form-box').eq(0).contains('E-mail').next().should('be.empty')
        cy.get('.default-form-box').eq(1).contains('Senha').next().should('be.empty')

        cy.get('.login_submit').should('be.visible')
        cy.get('.form-check input[type="checkbox"]').should('not.be.checked')
        cy.get('.form-check-label').should('contain', 'Lembrar de mim')
        cy.get('#createAccount')
          .should('contain.text', 'Ainda não tem conta?')
          .should('have.attr', 'href')
      })
    })

    it('2- Validar login com sucesso', () => {
      cy.get('#user').type(config.email).should('have.value', config.email)
      cy.get('#password').type(config.password, { log: false })
      cy.get('.login_submit').click()
      cy.get('.swal2-popup')
        .should('be.visible')
        .within(($popUp) => {
          cy.get($popUp).should('contain', 'Login realizado')
          cy.get($popUp).should('contain', `Olá, ${config.email}`)
        })
    })

    it('3- Validar login com Lembrar de mim selecionado', () => {
      cy.get('#user').type(config.email).should('have.value', config.email)
      cy.get('#password').type(config.password, { log: false })
      cy.get('#materialUnchecked').check()
      cy.get('.login_submit').click()
    })
  })

  context('Validações de mensagens de erros do login', () => {
    it('1- Validar obrigatoriedade do campo E-mail', () => {
      cy.get('.account_form').within(($form) => {
        cy.get('#btnLogin').click()
        cy.get($form).should('contain', 'E-mail inválido')
      })
    })

    it('2- Validar obrigatoriedade do campo Senha', () => {
      cy.get('.account_form').within(($form) => {
        cy.get('#user').type(config.email).should('have.value', config.email)
        cy.get('#btnLogin').click()
        cy.get($form).should('contain', 'Senha inválida')
      })
    })
  })
})
