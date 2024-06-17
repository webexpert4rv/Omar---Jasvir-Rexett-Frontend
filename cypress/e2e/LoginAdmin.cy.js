



// Define a common function for login
const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}

const baseUrl = 'http://localhost:3000';

describe('Login Page', () => {
  // beforeEach(() => {
  //   // Load the login page before each test
  //   cy.visit(`${baseUrl}/`);
  // });

  it('should navigate to the dashboard after successful login', () => {
    cy.visit('http://localhost:3000/admin-login')
    // Perform login
    login("rexett_admin@yopmail.com", "admin@123"); 

    cy.url().should('eq', `${baseUrl}/admin/admin-dashboard`);
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview');
    cy.get('.active > div > .overview-card-subhead')
    cy.get(':nth-child(2) > div > .overview-card-subhead')

    //Verify Total revenue section 

    cy.get(':nth-child(3) > .row > :nth-child(1) > .card-box')



  });


  // it('should display an error message with invalid credentials', () => {
  //   cy.visit('http://localhost:3000/client/dashboard')
  // //   // Perform invalid login
  // //   login("invalid@domain.com", "InvalidPassword");

  // //   // Verify error message is displayed for invalid credentials
  // //   cy.get('.error-message', { timeout: 10000 }).should('be.visible');
  // });
});
















