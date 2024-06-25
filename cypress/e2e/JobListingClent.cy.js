// Define a common function for login
const login = (email, password) => {
    cy.get("input[name='email']").should('be.visible').type(email)
    cy.get('input[name="password"]').should('be.visible').type(password)
    cy.get('button[type="submit"]').should('be.visible').click()
}

const baseUrl = 'http://localhost:3000';

describe('Login Page', () => {
    it('should navigate to the dashboard after successful login', () => {
        cy.visit(`${baseUrl}/`)
        // Perform login
        login("pankajClient@yopmail.com", "Pankaj@0987");

        // Verify the successful login by visiting the dashboard
        cy.url().should('eq', `${baseUrl}/client/dashboard`);

        // Visit the Jobs page
        cy.visit(`${baseUrl}/client/job-posted`)

        // Verify the tabs are present
        cy.get('.job-listing-tabs').should('exist')
        cy.get('.job-listing-tabs').contains('All')
        cy.get('.job-listing-tabs').contains('In Progress')
        cy.get('.job-listing-tabs').contains('End Jobs')

        // Intercept the API call for job listings
        cy.intercept('GET', '**/client/job-list*').as('getJobListing')

        // Click on In Progress tab 
        cy.get('.job-listing-tabs').contains('In Progress').click()

        //Click on End Jobs tab
        cy.get('.job-listing-tabs').contains('End Jobs').click()

        // Verify the presence of the eye icon and click on it
        cy.get('.job-posted-list').first().within(() => {
            cy.get('.arrow-btn.primary-arrow').should('exist').click({ force: true })
        })

        //Goes to the single job page and verify 
        cy.url().should('include', '/client/single-job/')

        //Verify there are multiple tabs present 
        cy.get('.job-tabs').should('exist')
        cy.get('.job-tabs').contains('Job Details')
        cy.get('.job-tabs').contains('Suggestions')
        cy.get('.job-tabs').contains('Shortlisted')
        cy.get('.job-tabs').contains('Interviewing')
        cy.get('.job-tabs').contains('Hired')

        // Verify click and goes to Suggestions tab
        cy.get('.job-tabs').contains('Suggestions').click()

        cy.wait(2000)

        //Verify click and goes to Shorlisted tab
        cy.get('.job-tabs').contains('Shortlisted').click()

        cy.wait(2000)

        //Verify cick and goes to the Interviewing tab
        cy.get('.job-tabs').contains('Interviewing').click()

        cy.wait(2000)

        //Verify click and goes to the Hired tab
        cy.get('.job-tabs').contains('Hired').click()

        //Go to the first tab "Job Details"
        cy.get('.job-tabs').contains('Job Details').click()

        //Click on the End job button if there
        cy.get('.flex-wrap').first().within(() => {
            cy.get('button.arrow-btn.danger-arrow').first().should('exist').click()
        })

        // For example, checking if a modal appears or a status changes
        cy.get('.custom-modal').should('be.visible')

        //Verify the input for feedback
        cy.contains('h3.popup-heading', 'End Job')

        //close the modal
        // cy.get('.custom-modal .modal-header button.close').click();



    });

    it('should check other tabs', () => {
        const baseUrl = 'http://localhost:3000'; // Replace with your actual base URL
        cy.visit(`${baseUrl}/`);
        login("pankajClient@yopmail.com", "Pankaj@0987");
    
        // Verify the successful login by visiting the dashboard
        cy.url().should('eq', `${baseUrl}/client/dashboard`);
    
        // Visit the Jobs page
        cy.visit(`${baseUrl}/client/job-posted`);
    
        // Verify the presence of the job list and wait for it to load
        cy.get('.job-posted-list').should('exist').and('be.visible').then(() => {
            // Verify the presence of the eye icon and click on it
            cy.get('.job-posted-list').first().within(() => {
                cy.get('.arrow-btn.primary-arrow').should('exist').click({ force: true });
    
                // Goes to the single job page and verify
                cy.url().should('include', '/client/single-job/');
    
                // Verify suggestions tab
                // cy.get('.job-tabs').should('exist');
            });
        });
    });
});
