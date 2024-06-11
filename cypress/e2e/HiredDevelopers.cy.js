// Import the login function from the login.js file
import { login } from './LoginClient.cy.js'

describe('Other Test File', () => {
    beforeEach(() => {
        // Load the login page before each test
        cy.visit('http://localhost:3000/')
    })

    it('should navigate to the Hired Developers after successful login', () => {

        // Perform login using the imported function
        login("damini@avioxtechnologies.com", "Damini@1234")

        // Verify redirection to the dashboard after successful login
        cy.url().should('eq', 'http://localhost:3000/client/dashboard')

        // Verify redirection to the Hired developers section after dashbboard
        cy.visit('http://localhost:3000/client/hired-developers')

        //Ensure the List of assigned developers Headig is visible 
        cy.get('h3.section-head-sub').should('be.visible')

        // Ensure the element contains the correct text
        cy.get('h3.section-head-sub').should('contain', 'List of assigned developers')

        // Ensure the table is visible
        cy.get('table.developer-table').should('be.visible')

        //Check that the table headers are correct
        cy.get('table.developer-table thead tr th').eq(0).should('contain', 'Developer Name')
        cy.get('table.developer-table thead tr th').eq(1).should('contain', 'Designation')
        cy.get('table.developer-table thead tr th').eq(2).should('contain', 'Email')

        //Check that the developers list is loaded
        cy.get('table.developer-table tbody tr').should('have.length.greaterThan', 0)

        // Click on the first row in the table
        cy.get('table.developer-table tbody tr').first().click()

       // Ensure the URL has changed to the developer details page
        cy.url().should('include', '/client/client-single-developer/')

    })

})