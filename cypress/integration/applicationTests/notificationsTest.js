/// <reference types="Cypress" />

import { Buttons } from '../../support/pom_objects/SideNav';
import { Header, HeaderButtons } from '../../support/pom_objects/MainHeader';
import { Notifications } from '../../support/pom_objects/NotificationPage'

// import { eq } from "lodash";

describe('Main Page suite', function() {
    
    const expected = [
        'Ibrahim Dickens liked a transaction.',
        'Kaylin Homenick received payment.',
        'Kaylin Homenick requested payment.',
        'Edgar Johns received payment.',
        'Edgar Johns commented on a transaction.',
        'Edgar Johns requested payment.',
        'Edgar Johns received payment.',
        'Edgar Johns requested payment.'
    ]
    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('Navigate to Notification page', function () {  
        cy.loginUser('Katharina_Bernier', 's3cret')
        cy.get(Buttons.notifications).click().then(() => {
            cy.get(Header.headerName).should('have.text', 'Notifications')
            cy.get(Notifications.notificationsList).children().then((item) => {
                for(let i = 0; i < item.length; i++){
                    cy.get('li')
                      .eq(i)
                      .find('div')
                      .eq(1)
                      .find('span')
                      .should('have.text', expected[i])
                }
            })
        })
    });

    it.only('Check Notification bell', function () {
        let notificationNum;
        cy.loginUser('Katharina_Bernier', 's3cret')
        cy.wait(7000)
        cy.get(HeaderButtons.notificationLink)
          .find('span')
          .then((value) =>{
            notificationNum = value[0].innerText;
          }).then(()=>{
                cy.get('#nav-top-notifications-link').click().then(() => {
                    cy.get(Header.headerName).should('have.text', 'Notifications')
                    cy.get(Notifications.notificationsList).children().then((item) => {
                        expect(item.length).to.be.eq(Number(notificationNum));
                        for(let i = 0; i < item.length; i++){
                            cy.get('li')
                              .eq(i)
                              .find('div')
                              .eq(1)
                              .find('span')
                              .should('have.text', expected[i])
                        }
                    })
                })
            })
    });
});