
// describe('Login Page', () => {
//     it('should navigate to the login page and log in successfully', () => {
//       // Visit the URL
//       cy.visit('http://localhost:3000/')
  
//       // Verify the login form is present
//       cy.get("input[name='email']").should('be.visible')
//       cy.get('input[name="password"]').should('be.visible')
  
//       // Enter email and password
//       cy.get("input[name='email']").type("damini@avioxtechnologies.com")
//       cy.get('input[name="password"]').type("Damini@1234")
  
//       // Click the submit button
//       cy.get('button[type="submit"]').should('be.visible').click()
  
//       // Verify that the user is redirected to the correct page after login
//       cy.url().should('eq', 'http://localhost:3000/client/dashboard')

//       cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview') // Adjust the expected text as necessary
//     })



  
//     it('should display an error message with invalid credentials', () => {
//       // Visit the URL
//       cy.visit('http://localhost:3000/')
  
//       // Verify the login form is present
//       cy.get("input[name='email']").should('be.visible')
//       cy.get('input[name="password"]').should('be.visible')
  
//       // Enter invalid email and password
//       cy.get("input[name='email']").type("invalid@domain.com")
//       cy.get('input[name="password"]').type("InvalidPassword")
  
//       // Click the submit button
//       cy.get('button[type="submit"]').should('be.visible').click()
  
//       // Verify that an error message is displayed
//       cy.get('.error-message')
//     })
    
//   })






// Define a common function for login
const login = (email, password) => {
  // Ensure email and password fields are visible and enter login credentials
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}

export { login };

describe('Login Page', () => {
  beforeEach(() => {
    // Load the login page before each test
    cy.visit('http://localhost:3000/')
  })

  it('should navigate to the dashboard after successful login', () => {
    // Perform login
    login("damini@avioxtechnologies.com", "Damini@1234")

    // Verify redirection to the dashboard after successful login
    cy.url().should('eq', 'http://localhost:3000/client/dashboard')

    // Ensure the Overview section is visible after login
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview')
  })

  it('should display an error message with invalid credentials', () => {
    // Perform invalid login
    login("invalid@domain.com", "InvalidPassword")

    // Verify error message is displayed for invalid credentials
    cy.get('.error-message')
  })
})




