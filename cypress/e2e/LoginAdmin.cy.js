// Define a common function for login
const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}

const baseUrl = 'http://localhost:3000';

describe('Login Page', () => {
  it('should navigate to the dashboard after successful login', () => {
    cy.visit('http://localhost:3000/admin-login')
    // Perform logins
    login("rexett_admin@yopmail.com", "admin@123");

    cy.url().should('eq', `${baseUrl}/admin/admin-dashboard`);
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview');
    cy.get('.active > div > .overview-card-subhead')
    cy.get(':nth-child(2) > div > .overview-card-subhead')

    //Verify Total revenue section 
    cy.get(':nth-child(3) > .row > :nth-child(1) > .card-box')
  });
});
















