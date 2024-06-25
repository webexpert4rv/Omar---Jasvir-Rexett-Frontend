// Define a common function for login
const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}

const baseUrl = 'http://localhost:3000';

describe('Login Page', () => {
  it('should navigate to the dashboard after successful login', () => {
    cy.visit('http://localhost:3000')
    // Perform login
    // login("Sourav@avioxtechnologies.com", "Sourabrana@3908"); 
    login("pankajClient@yopmail.com", "Pankaj@0987"); 
    cy.url().should('eq', `${baseUrl}/client/dashboard`);
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview');
  });
});
















