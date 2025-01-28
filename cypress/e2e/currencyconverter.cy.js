/// <reference types="cypress" />
describe('Conversor de Moedas', () => {
  beforeEach(() => {
    cy.visit('https://conversormoedasi.vercel.app/')
  });
 it('verifica se todos os elementos estão visíveis', () => {    
  cy.get('#amount-input').should('be.visible')
  cy.get('#from-dropdown').should('be.visible')
  cy.get('#to-dropdown').should('be.visible')
  cy.get('button').should('be.visible')  
 })
 it('deve realizar uma conversão válida', () => {
  cy.get('#amount-input').type('1')
  cy.get('#from-dropdown').click()
  cy.get('#from-list div[data-value="USD"]').click()
  cy.get('#to-dropdown').click()
  cy.get('#to-list div[data-value="EUR"]').click();
  cy.get('[type="submit"]').click()

  cy.get('#result')
    .invoke('text')
    .should('match', /^\d+ USD = \d+\.\d{2} EUR$/)      
 })
 it('Deve impedir a conversão para a mesma moeda', () => {
  cy.get('#amount-input').type('1')
  cy.get('#from-dropdown').click()
  cy.get('#from-list div[data-value="USD"]').click()
  cy.get('#to-dropdown').click()
  cy.get('#to-list div[data-value="USD"]').click();
  cy.get('[type="submit"]').click()

  cy.get('#result')
    .should('be.visible')
    .and('contain', 'Erro: As moedas de origem e destino são iguais.')
 })

 it('Deve permirtir limpar o formulario após conversão', () => {
  cy.get('#amount-input').type('1')
  cy.get('#from-dropdown').click()
  cy.get('#from-list div[data-value="USD"]').click()
  cy.get('#to-dropdown').click()
  cy.get('#to-list div[data-value="EUR"]').click();
  cy.get('[type="submit"]').click()

  cy.get('#result')
    .invoke('text')
    .should('match', /^\d+ USD = \d+\.\d{2} EUR$/)
    
  cy.get('#clear-btn').click()

  cy.get('#amount-input').should('have.value', '')
  cy.get('#from-dropdown').should('have.value', '')
  cy.get('#to-dropdown').should('have.value', '')
 })
 
})