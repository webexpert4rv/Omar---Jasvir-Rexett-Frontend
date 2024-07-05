// Define a common function for login
const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}
const baseUrl = 'http://localhost:3000';

describe('Intrerviews page', () => {
  it('should navigate to the dashboard after successful login', () => {
    cy.visit('http://localhost:3000/admin-login')

    // Perform login 
    login("rexett_admin@yopmail.com", "Admin@123");

    cy.url().should('eq', `${baseUrl}/admin/admin-dashboard`);

    //Visit the Interviews page
    cy.visit('http://localhost:3000/admin/interviews')

    //Verify the correct page with checking its header
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Interviews')

      //Check the table headers are correct 
      cy.get('table.table-ui-custom').should('be.visible');
      cy.get('table thead tr th').eq(0).should('have.text', 'Developer Name');
      cy.get('table thead tr th').eq(1).should('have.text', 'Project');
      cy.get('table thead tr th').eq(2).should('have.text', 'Client Name');
      cy.get('table thead tr th').eq(4).should('have.text', 'Status');

  });
});