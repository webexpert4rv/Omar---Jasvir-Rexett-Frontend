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

    //Check the description of the overview section
    cy.get('p').should('be.visible')

    //Check if there are cards with some data present
    cy.contains('.overview-card-wrapper .overview-card', 'Fund')
    cy.contains('.overview-card-wrapper .overview-card', 'Earned Back')
    cy.contains('.overview-card-wrapper .overview-card', 'Job Posted')
    cy.contains('.overview-card-wrapper .overview-card', 'Developer Assigned')

    //Verify the Projects total text is there in the card
    cy.contains('h3', 'Total Projects')

    //Verify if the completed projects text is there in the card
    cy.contains('h3', 'Completed Projects')

    //Verify the table header 
    cy.contains('h3', 'Activity Logs')

    //Check the table headers are correct 
    cy.get('table.table-ui-custom').should('be.visible');
    cy.get('table thead tr th').eq(0).should('have.text', 'Date');
    cy.get('table thead tr th').eq(1).should('have.text', 'Activity');
    cy.get('table thead tr th').eq(2).should('have.text', 'Time');

    //Check the heading of assigned developers table 
    cy.contains('h3', 'List of assigned developers')

    //Verify the headers of assigned developers table are correct
    cy.get('table.developer-table').should('be.visible');
    cy.get('table thead tr th').eq(0).should('contain.text', 'Developer Name');
    cy.get('table thead tr th').eq(1).should('contain.text', 'Designation');
    cy.get('table thead tr th').eq(2).should('contain.text', 'Email');

    
  })




 
})