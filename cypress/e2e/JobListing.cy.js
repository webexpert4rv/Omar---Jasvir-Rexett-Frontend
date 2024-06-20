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
        cy.visit('http://localhost:3000/admin/admin-job-listing')

        //Verify if the tabs present there !
        cy.get('.job-listing-tabs').should('exist')
        cy.get('.job-listing-tabs').contains('All')
        cy.get('.job-listing-tabs').contains('New Job Posts')
        cy.get('.job-listing-tabs').contains('In Progress')

        cy.intercept('GET', '**/admin/job-list*').as('getJobListing')

        // Click on New Job Posts tab and wait for API response
        cy.get('.job-listing-tabs').contains('New Job Post').click()
        cy.wait('@getJobListing').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body).to.have.property('data')
            expect(interception.response.body.data).to.be.an('array')
        })

        //Click on In Progress tab 
        cy.get('.job-listing-tabs').contains('In Progress').click()
        cy.get('.job-listing-tabs').contains('In Progress').click()
        cy.wait('@getJobListing').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body).to.have.property('data')
            expect(interception.response.body.data).to.be.an('array')
        })

        // Check pagination controls and interactions
        cy.get('.pagination').should('exist')
        cy.get('.pagination').contains('2').click()
        cy.wait('@getJobListing').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body).to.have.property('data')
            expect(interception.response.body.data).to.be.an('array')
        })
        cy.get('.pagination').contains('3').click()
        cy.wait('@getJobListing').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body).to.have.property('data')
            expect(interception.response.body.data).to.be.an('array')
        })




    });
});