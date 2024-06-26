const login = (email, password) => {
    cy.get("input[name='email']").should('be.visible').type(email)
    cy.get('input[name="password"]').should('be.visible').type(password)
    cy.get('button[type="submit"]').should('be.visible').click()
}

describe('Hired deveopers Test file', () => {
    beforeEach(() => {
        // Load the login page before each test
        cy.visit('http://localhost:3000/')
    })

    it('should navigate to the Hired Developers after successful login', () => {
                // Mock the API call for getting developer details
                cy.intercept('GET', '**/common/developer-details/*', {
                    statusCode: 200,
                    body: {
                        data: {
                            id: '1',
                            name: 'John Doe',
                            designation: 'Software Engineer',
                            email: 'johndoe@example.com',
                        }
                    }
                }).as('getDeveloperDetails');
        
        // Perform login using the imported function
        login("pankajClient@yopmail.com", "Pankaj@0987")

        // Verify redirection to the dashboard after successful login
        cy.url().should('eq', 'http://localhost:3000/client/dashboard')

        // Verify redirection to the Hired developers section after dashbboard
        cy.visit('http://localhost:3000/client/hired-developers')

        //Ensure the List of assigned developers Headig is visible 
        cy.get('h3.section-head-sub').should('be.visible')

        // Ensure the element contains the correct text
        cy.get('h3.section-head-sub').should('contain', 'List of assigned developers')

        // Ensure the table is visible
        cy.get('table.developer-table').should('be.visible')

        //Check that the table headers are correct
        cy.get('table.developer-table thead tr th').eq(0).should('contain', 'Developer Name')
        cy.get('table.developer-table thead tr th').eq(1).should('contain', 'Designation')
        cy.get('table.developer-table thead tr th').eq(2).should('contain', 'Email')

        //Check that the developers list is loaded
        cy.get('table.developer-table tbody tr').should('have.length.greaterThan', 0)

        // Click on the first row in the table
        cy.get('table.developer-table tbody tr').first().click()

        // Ensure the URL has changed to the developer details page
        cy.url().should('include', '/client/client-single-developer/')

        // Wait for the API call to complete
        cy.wait('@getDeveloperDetails').its('response.statusCode').should('eq', 200);

        //verify developer head
        cy.contains('h2.section-head', 'Overview')

        //Verify dev name 
        cy.contains('h3.resume-name' , 'John Doe' )

        //Verify other texts
        cy.contains('h3.subheading-resume',"Skills")

        //Verify Playback button and Transcript button
        cy.get('button').contains('Playback')
        cy.get('button').contains('Transcript')

        //Verify back button and click on it 
        cy.get('button').contains('Back').click()


    })
})