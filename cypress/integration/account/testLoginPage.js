/// <reference types="Cypress" />
import { loginPageErrors, loginPage } from '../../fixtures/constLoginPage';
import { user1AccountInfo } from '../../fixtures/constMainPage';
import { SignInForm } from '../../support/pom_objects/SignInPage';
import { Alias, Buttons } from '../../support/pom_objects/SideNav'

const user1= Cypress.env('user1')
const user2= Cypress.env('user2')


describe('Login Page suite', function() {

    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('1. Login with empty username', function() {
        cy.get(SignInForm.username).clear();
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.userNameError).should('have.text', loginPageErrors.usernameRequired);
        cy.get(SignInForm.signIn).should('be.disabled');
    });

    it('2. Login with empty password', function() {
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).clear();
        cy.get(SignInForm.signIn).should('be.disabled');
    });

    it('3. Login with empty username and password', function() {
        cy.get(SignInForm.signIn).click();
        cy.get(SignInForm.userNameError).should('have.text', loginPageErrors.usernameRequired);
    });

    it('4. Login with wrong username', function() {
        cy.get(SignInForm.username).type(user2.username);
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.signIn).click();
        cy.get(SignInForm.signInError).should('have.text', loginPageErrors.signinError)
    });

    it('5. Login with wrong password', function() {
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).type(user2.password);
        cy.get(SignInForm.signIn).click();
        cy.get(SignInForm.signInError).should('have.text', loginPageErrors.signinError)
    });

    it('6. Login succesufully', function() {
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.signIn).click();
        cy.get(Alias.name).contains(user1AccountInfo.name);
        cy.get(Alias.userId).contains(user1AccountInfo.alias);
    });

    it('7. Logout', function() {
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.signIn).click();
        cy.get(Buttons.logout).click();
        cy.get(SignInForm.signInHeader).contains(loginPage.signIn)
    });
});