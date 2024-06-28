// Define a common function for login
const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}
const baseUrl = 'http://localhost:3000';

describe('Leave request page', () => {
  it('should navigate to the dashboard after successful login', () => {
    cy.visit('http://localhost:3000')

    // Perform login 
    login("pankajClient@yopmail.com", "Pankaj@0987");

    cy.url().should('eq', `${baseUrl}/client/dashboard`);

    //Visit Leave request page 
    cy.visit(`${baseUrl}/client/leave-request`)

    // Ensure the tabs are visible
    cy.get('.application-pills .application-item').should('have.length', 6);

    //Check if there is leaves rejected tab present and click on it!
    cy.get('.application-pills .application-link').contains('Leaves Rejected').click();

    //Check if there is Public Holiday tab is present
    cy.get('.application-pills .application-link').contains('Public Holiday').click();
    
  });
});