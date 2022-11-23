/// <reference types="Cypress" />
import { request, payment, expectedResult } from '../../fixtures/constTransaction';

const user1= Cypress.env('user1')

describe('Main Page suite', function() {
    
    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('Tabs navigation', function() {
      cy.loginUser(user1.username, user1.password);
      cy.tabNavigation('[data-test="nav-public-tab"]');
      cy.tabNavigation('[data-test="nav-contacts-tab"]');
      cy.tabNavigation('[data-test="nav-personal-tab"]');
      cy.logoutUser();
    });

    it('Create new transaction request', function() {
      // let amount = 123, description = 'test request' 
      cy.loginUser(user1.username, user1.password)
      cy.newTransaction('[data-test="user-list-item-bDjUb4ir5O"]', request.amount, request.description, 'request')
      cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
        .should('have.text', expectedResult.expectedRequestText)
      cy.get('#new-transaction-return-to-transactions > .MuiButton-label').click()
      //cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
      cy.get('.MuiListSubheader-root').contains('Public')
      cy.logoutUser()
    });

    it.only('Create new transaction pay', function() {
      // let amount = 123, description = 'test pay' 
      cy.loginUser(user1.username, user1.password)
      cy.newTransaction('[data-test="user-list-item-24VniajY1y"]', payment.amount, payment.description, 'payment')
      cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
        .should('have.text', expectedResult.expectedPaymentText)
      cy.get('#new-transaction-return-to-transactions > .MuiButton-label').click()
      //cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
      cy.get('.MuiListSubheader-root').contains('Public')
      cy.logoutUser()
    });

    it('HIde and show options', function() {
      cy.loginUser(user1.username, user1.password)
      cy.get('#sidenav-toggle').click()
      //cy.get('[data-test="sidenav-toggle"]').click()
      cy.get('[data-test="sidenav-home"] > .MuiListItemText-root > .MuiTypography-root')
        .should('not.be.visible')
      cy.get('#sidenav-toggle').click()
      //cy.get('[data-test="sidenav-toggle"]').click()
      cy.get('[data-test="sidenav-home"] > .MuiListItemText-root > .MuiTypography-root')
        .should('be.visible')
      cy.logoutUser()
    });

});