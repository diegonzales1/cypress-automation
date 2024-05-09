import './imports'
import { recurse } from 'cypress-recurse'

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
