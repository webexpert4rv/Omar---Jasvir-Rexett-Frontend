



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

        //Visit to Dashboard Page
        cy.url().should('eq', `${baseUrl}/admin/admin-dashboard`);

        //Visit to New Apllicants page
        cy.visit('http://localhost:3000/admin/applications')

        //Verify the page is correct by its heading 
        cy.contains('h2.section-head', 'New Applicants')

        //Verify the search input and button
        cy.get('input[type="text"]').should('be.visible')
        cy.get('button.main-btn').should('be.visible')

        //Verify the tabs 
        cy.get('.application-pills')

        //Verify the exact tabs
        cy.get('.application-link').contains('Clients')
        cy.get('.application-link').contains('Vendors')
        cy.get('.application-link').contains('Developers')

        //Click on the Vendors tab
        cy.get('.application-link').contains('Vendors').click()

        //Verify the table of vendors tab 
        cy.get('.table.table-ui-custom').should('be.visible')

        cy.get('#left-tabs-example-tabpane-vendors > .table-responsive > .table > thead > tr > :nth-child(1)')
        cy.get('#left-tabs-example-tabpane-vendors > .table-responsive > .table > thead > tr > :nth-child(2)')
        cy.get('#left-tabs-example-tabpane-vendors > .table-responsive > .table > thead > tr > :nth-child(3)')
  
 


    });
});
















