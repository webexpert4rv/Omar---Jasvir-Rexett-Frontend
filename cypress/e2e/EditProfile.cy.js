// Import the login function from the login.js file
import { login } from './LoginClient.cy.js'

describe('Other Test File', () => {
    beforeEach(() => {
        // Load the login page before each test
        cy.visit('http://localhost:3000/')
    })

    it('should navigate to the Edit profile after successful login', () => {
        // Perform login using the imported function
        login("damini@avioxtechnologies.com", "Damini@1234")

        // Verify redirection to the dashboard after successful login
        cy.url().should('eq', 'http://localhost:3000/client/dashboard')

        //load the edit-profile page
        cy.visit('http://localhost:3000/client/edit-profile')

        //Ensure the  Heading is visible and contains the correct text 
        cy.get('h2.section-head-sub').should('be.visible').should('have.text', 'Update your Profile')

        //Input fields for updating the profile
        cy.get("input[name='name']").should('be.visible')
        cy.get("input[name='email']").should('be.visible')
        cy.get("input[name='phone_number']").should('be.visible')
        cy.get("input[name='previous_password']").should('be.visible')
        cy.get("input[name='password']").should('be.visible')
        cy.get("input[name='address']").should('be.visible')
        cy.get("input[name='address_2']").should('be.visible')
        cy.get("input[name='city']").should('be.visible')
        cy.get("input[name='passcode']").should('be.visible')
        cy.get("input[name='country']").should('be.visible')

        //Submit button to update the profile
        cy.contains('button', 'Update Profile').should('be.visible');
        
    })

})