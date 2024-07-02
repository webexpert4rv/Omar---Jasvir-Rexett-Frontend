const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}

describe('Edit Profile Test File', () => {
  beforeEach(() => {
      // Load the login page before each test
      cy.visit('http://localhost:3000/')
  })

  it('should navigate to the Edit profile after successful login', () => {
      // Perform login using the imported function
      login("pankajClient@yopmail.com", "Pankaj@0987")

      // Verify redirection to the dashboard after successful login
      cy.url().should('eq', 'http://localhost:3000/client/dashboard')

      //load the edit-profile page
      cy.visit('http://localhost:3000/client/edit-profile')

      //Ensure the  Heading is visible and contains the correct text 
      cy.get('h2.section-head-sub').should('be.visible').should('have.text', 'Update your Profile')

      // Ensure the tabs are visible
      cy.get('.application-pills .application-item').should('have.length', 2);

      // Click on the Personal Details tab and verify its content
      cy.get('.application-pills .application-link').contains('Personal Details').click();
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="phone_number"]').should('be.visible');
      cy.get("input[name='previous_password']").should('be.visible')
      cy.get("input[name='password']").should('be.visible')
      cy.get("input[name='address']").should('be.visible')
      cy.get("input[name='address_2']").should('be.visible')


      // Click on the Company Details tab and verify its content
      cy.get('.application-pills .application-link').contains('Company Details').click();
      

  })
  it('should navigate to the Edit Profile and update Company details', () => {
      // Perform login using the imported function
      login("pankajClient@yopmail.com", "Pankaj@0987");

      // Verify redirection to the dashboard after successful login
      cy.url().should('eq', 'http://localhost:3000/client/dashboard');

      // Load the edit-profile page
      cy.visit('http://localhost:3000/client/edit-profile');

      // Click on the Company Details tab
      cy.get('.application-pills .application-link').contains('Company Details').click();

      // Ensure the Company Logo upload label is visible and click it to trigger the file input
      cy.get('label.camera-btn').click();

      // Interact with the file input directly using `invoke` to set the value
      const fileName = 'sample-logo.png';
      cy.fixture(fileName).then((fileContent) => {
          cy.get('input[type="file"][id="company_logo_file"]').attachFile({
              fileContent,
              fileName,
              mimeType: 'image/png',
          });
      });

      // Check for Company Name input
      cy.get('input[name="company_name"]').should('be.visible').clear().type('My Company');

      // Check for Company Type dropdown and select a value
      cy.get('select[name="company_type"]').should('be.visible').select('Corporation');

      // Check for Company Address autocomplete
      cy.get('input[name="company_address"]').should('be.visible').clear().type('123 Main St, New York, NY, USA');

      // Check for Tax ID input
      cy.get('input[name="company_tax_id"]').should('be.visible').clear().type('123-45-6789');

      // Intercept the API call to update the profile
      cy.intercept('PUT', '**/client/update-profile/').as('updateProfile');

      // Ensure the form is properly targeted and submit it
      cy.get('form').first().submit();

      // Debug statement to ensure the form is being submitted
      cy.get('form').first().invoke('submit').then(() => {
          console.log('Form submitted');
      });

      // Verify the profile update API call with increased timeout
      cy.wait('@updateProfile', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

      // Optionally check for a success message or redirectionn
      cy.get('.Toastify__toast--success').should('contain.text', 'Profile is Updated');
  });
})