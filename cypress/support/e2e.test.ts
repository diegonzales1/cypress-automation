/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Efetua o login no ambiente.
     *
     * @see  support/e2e.js
     * @example cy.login()
     */
    login(): Cypress.Chainable<JQuery<HTMLElement>>

    /**
     * Faz scroll até um elemento especificado pelo seletor e clica nele.
     *
     * @param {string} seletor - Seletor que identifica o elemento onde a busca deve ser realizada.
     * @see  support/e2e.js
     *
     * @example cy.darScrollAteBotaoEClicar(#MeuSeletor)
     */
    darScrollAteBotaoEClicar(): Cypress.Chainable<JQuery<HTMLElement>>

    /**
     * Busca um texto específico dentro de um elemento da página web.
     * Caso o texto não seja encontrado na primeira tentativa, ele efetua 10 tentativas.
     *
     * @param {string}  seletor - Seletor que identifica o elemento onde a busca deve ser realizada.
     * @param {string}  texto - O texto que se deseja encontrar dentro do elemento.
     *
     * @see  support/e2e.js
     * @example cy.buscarTexto('#meuElemento', 'Texto para buscar')
     */
    buscarTexto(): Cypress.Chainable<JQuery<HTMLElement>>

    /**
     * Gera e retorna a data de hoje.
     *
     * @return {string} DD/mm/AAAA
     *
     * @see  support/e2e.js
     * @example cy.gerarDataAtual()
     */
    gerarDataAtual(): Cypress.Chainable<JQuery<HTMLElement>>

    /**
     * Limpa o sessionStorage da janela do navegador.
     *
     * @see  support/e2e.js
     *
     * @example
     * cy.limparSessionStorage()
     */
    limparSessionStorage(): Cypress.Chainable<JQuery<HTMLElement>>
  }
}
