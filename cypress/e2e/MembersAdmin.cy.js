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

        //Visit to New Members page
        cy.visit('http://localhost:3000/admin/members')

        //Verify the members head 
        cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Members')

        //Check if the form and fields are rendered
        cy.get('form').should('exist');
        cy.get('[data-cy="date"]').should('exist');
        cy.get('[data-cy="timeFilter"]').should('exist')
        cy.get('[data-cy="search"]').should('exist')

        // Check if the search field is rendered
        cy.get('input[type="text"]').should('exist');
        cy.get('button').contains('Filter').should('exist');

        cy.get('input[type="date"]').type('2023-06-15');

        // Submit the form;
        cy.get('button').contains('Filter').click();

        //Verify the tabs section
        cy.get('.application-pills')

        //Verify the tabs with their names
        cy.get('.application-link').contains('Clients')
        cy.get('.application-link').contains('Vendors')
        cy.get('.application-link').contains('Developers')

    });
});
















