



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

  
 


    });
});
















