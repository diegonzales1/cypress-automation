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

  context('Validar campos do cadastro de usuário', () => {
    it.only('1- Validar campos existentes pada cadastro', () => {
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
  })
})
