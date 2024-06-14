import { login } from './LoginClient.cy.js'

describe('Time Reporting Page', () => {
    it('should navigate to the Time reporting after successful login', () => {
        // Perform login using the imported function
        login("pankajClient@yopmail.com", "Pankaj@0987")

        // Verify redirection to the dashboard after successful login
        cy.url().should('eq', 'http://localhost:3000/client/dashboard')

        //load the Time reporting page
        cy.visit('http://localhost:3000/client/time-reporting')

        cy.contains('.time-filter-select', 'Select Year')
        cy.contains('time-filter-select', 'Select Month')
        cy.contains('button', 'Filter').click()
    })
  })