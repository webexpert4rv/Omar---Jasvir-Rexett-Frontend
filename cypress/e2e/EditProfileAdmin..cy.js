// Define a common function for login
const login = (email, password) => {
    cy.get("input[name='email']").should('be.visible').type(email)
    cy.get('input[name="password"]').should('be.visible').type(password)
    cy.get('button[type="submit"]').should('be.visible').click()
  }
  
  const baseUrl = 'http://localhost:3000';

  describe('Edit Profile Test File', () => {
    beforeEach(() => {
        // Load the login page before each test
        cy.visit('http://localhost:3000/admin/edit-admin-profile')
    })

    it('should navigate to the Edit profile after successful login', () => {
        // Perform login using the imported function
        login("rexett_admin@yopmail.com", "admin@123"); 

        // Verify redirection to the dashboard after successful login
        cy.url().should('eq', 'http://localhost:3000/admin/admin-dashboard')

        //load the edit-profile page
        cy.visit('http://localhost:3000/admin/edit-admin-profile')

        //Ensure the  Heading is visible and contains the correct text 
        cy.get('h2.section-head-sub').should('be.visible').should('have.text', 'Update your Profile')

        //Input fields for updating the profile
        cy.get("input[name='name']").should('be.visible')
        cy.get("input[name='email']").should('be.visible')
        cy.get("input[name='phone_number']").should('be.visible')
        cy.get("input[name='previous_password']").should('be.visible')
        cy.get("input[name='password']").should('be.visible')
        cy.get("input[name='address']").should('be.visible')
        cy.get("input[name='address_2']").should('be.visible')
        cy.get("input[name='city']").should('be.visible')
        cy.get("input[name='passcode']").should('be.visible')
        cy.get("input[name='country']").should('be.visible')

        //Submit button to update the profile
        cy.contains('button', 'Update Profile').should('be.visible');
        cy.contains('button','Update Profile').click()
        
    })

})