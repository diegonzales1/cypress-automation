/* eslint-disable prettier/prettier */
/* eslint-disable import/no-dynamic-require */
const env = Cypress.env('configFile')
const config = require(`../../configs/${env}.json`)

describe('Teste', () => {
  it('exemplos', () => {
    cy.visit(config.baseUrl)
    cy.buscarTexto()
  })
})