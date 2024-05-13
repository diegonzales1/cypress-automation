/* eslint-disable prettier/prettier */
/* eslint-disable import/no-dynamic-require */
const env = Cypress.env('configFile')
const config = require(`../../configs/${env}.json`)

describe('Funcionalidade: Carrinho', () => {
  beforeEach(() => {
    cy.visit(config.baseUrl)
    cy.login()
  })

  context('Validações de itens no carrinho', () => {
    it('Validar inclusão de item no carrinho', () => {
      cy.get('.has-megaitem > [href="#!"]').trigger('mouseover').then(() => {
        cy.get('li > a[href="/product-details-two/1"]').should('contain', 'Product Single Two').click({ force: true })
      })
      cy.get('.links_Product_areas > .theme-btn-one').click()
      cy.clock()
      cy.get('.swal2-popup').within(($popup) => {
        cy.get($popup).should('contain', 'Success!')
        cy.get($popup).should('contain', 'Successfully added to your Cart')
      })
    })

    it('Validar remoção de itens do carrinho', () => {
      cy.get('.has-megaitem > [href="#!"]').trigger('mouseover').then(() => {
        cy.get('li > a[href="/product-details-two/1"]').should('contain', 'Product Single Two').click({ force: true })
      })
      cy.get('.links_Product_areas > .theme-btn-one').click() 
      cy.get('.offcanvas-cart > :nth-child(1) > .text-right > .offcanvas-wishlist-item-delete > .fa').click({ force: true })
      cy.get('.offcanvas-cart > :nth-child(1) > .text-right > .offcanvas-wishlist-item-delete > .fa').click({ force: true })
      cy.get('.offcanvas-cart > :nth-child(1) > .text-right > .offcanvas-wishlist-item-delete > .fa').click({ force: true })
      cy.get('.col-12 > .header-action-link > :nth-child(2) > .offcanvas-toggle > .item-count').click({ force: true })
      cy.get('.offcanvas-cart > .offcanvas-wishlist-item-single > .offcanvas-wishlist-item-block > .offcanvas-wishlist-item-content > .offcanvas-wishlist-item-link').should('contain', 'Green Dress For Woman')
    })

    it('Validar limpeza do carrinho', () => {
     cy.limpeza()
    })

    it.only('Validar ajuste de tamanho e cor produto', ()=> {
      cy.limpeza()

      cy.get('.has-megaitem > [href="#!"]').trigger('mouseover').then(() => {
        cy.get('li > a[href="/product-details-one/1"]').should('contain', 'Product Single').click({ force: true })
      })
      cy.get('select').select('XL')
      cy.get('.product-color-blue').click()
     

      
    })
  })
})



