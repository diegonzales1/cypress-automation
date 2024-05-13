import { recurse } from 'cypress-recurse'

/* eslint-disable prettier/prettier */
/* eslint-disable import/no-dynamic-require */
const env = Cypress.env('configFile')
const config = require(`../configs/${env}.json`)

Cypress.Commands.add('login', () => {
  cy.contains('a[href="/login"]', ' Login').click()
  cy.get('#user').type(config.email).should('have.value', config.email)
  cy.get('#password').type(config.password, { log: false })
  cy.get('.login_submit').click()
  cy.get('.swal2-popup')
    .should('be.visible')
    .within(($popUp) => {
      cy.get($popUp).should('contain', 'Login realizado')
      cy.get($popUp).should('contain', `Olá, ${config.email}`)
      cy.get('.swal2-actions button').contains('OK').click()
    })
})

Cypress.Commands.add('gerarDataAtual', () => {
  const hoje = new Date()
  const dia = hoje.getDate().toString().padStart(2, '0')
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const ano = hoje.getFullYear()
  const dataAtual = `${dia}/${mes}/${ano}`

  return dataAtual
})

Cypress.Commands.add('limparSessionStorage', () => {
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})

Cypress.Commands.add('buscarTexto', (seletor, texto) => {
  recurse(
    () => cy.get(seletor),
    (selector) => selector.contains(texto).should('be.visible'),
    {
      delay: 1000,
      limit: 10,
      timeout: 1000,
      log: false,
      error: `Objeto ${seletor} não encontrado`
    }
  )
})

Cypress.Commands.add('darScrollAteBotaoEClicar', (seletor) => {
  cy.get(seletor)
    .scrollIntoView() // Ensure smooth scrolling
    .should('be.visible') // Verify element visibility before clicking
    .click()
})

Cypress.Commands.add('limpeza', () => {
  cy.get('.has-megaitem > [href="#!"]').trigger('mouseover').then(() => {
    cy.get('li > a[href="/product-details-two/1"]').should('contain', 'Product Single Two').click({ force: true })
  })
  cy.get('.col-12 > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
  cy.get('.offcanvas-cart-action-button > :nth-child(1) > .theme-btn-one').click()
  cy.get('.cart_submit > .theme-btn-one').click()
  cy.get('h2').should('contain', 'YOUR CART IS EMPTY')
})
