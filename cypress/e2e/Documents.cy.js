// Import the login function from the login.js file
import { login } from './LoginClient.cy.js'


describe('Title and Project URL Test', () => {
    beforeEach(() => {
        // Load the login page before each test
        cy.visit('http://localhost:3000/')
    })
    it('should navigate to the Edit profile after successful login', () => {
        // Perform login using the imported function
        login("damini@avioxtechnologies.com", "Damini@1234")

        // Verify redirection to the dashboard after successful login
        cy.url().should('eq', 'http://localhost:3000/client/dashboard')

        //load the documents page
        cy.visit('http://localhost:3000/client/documents')

        //Verify the filter 
        cy.contains('button', 'Filter').click()

        //Verify filter section elements
        cy.contains('h3', 'Filter')

        //Verify the filter section inputs 
        cy.get('input[type=text]').should('be.visible').type('new')

        //Verify clear button 
        cy.contains('button', 'Clear').click()

        //Verify if there is any Documents Heading
        cy.contains('h3', 'Documents')

        //Verify the plus button 
        cy.contains('button.px-2', '+').click()

        //Verify the create folder button
        cy.contains('Create Folder')
        cy.contains('Upload File')

    })
})