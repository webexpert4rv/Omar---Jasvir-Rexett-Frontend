// Import the login function from the login.js file
import { login } from './LoginClient.cy.js'

describe('Other Test File', () => {
  beforeEach(() => {
    // Load the login page before each test
    cy.visit('http://localhost:3000/')
  })

  it('should navigate to the dashboard after successful login', () => {
    // Perform login using the imported function
    login("damini@avioxtechnologies.com", "Damini@1234")

    // Verify redirection to the dashboard after successful login
    cy.url().should('eq', 'http://localhost:3000/client/dashboard')

    // Ensure the Overview section is visible after login
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview')

    // cy.visit('http://localhost:3000/client/hired-developers')


   
  })


 
})