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
  });
});