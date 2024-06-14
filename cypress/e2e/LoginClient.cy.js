

// // Define a common function for login
// const login = (email, password) => {
//   // Ensure email and password fields are visible and enter login credentials
//   cy.get("input[name='email']").should('be.visible').type(email)
//   cy.get('input[name="password"]').should('be.visible').type(password)
//   cy.get('button[type="submit"]').should('be.visible').click()
//   // cy.get('.form').submit()
// }

// export { login };

// describe('Login Page', () => {
//   beforeEach(() => {
//     // Load the login page before each test
//     cy.visit('http://localhost:3000/')
//   })

//   it('should navigate to the dashboard after successful login', () => {
//     // Perform login
//     login("pankajClient@yopmail.com", "Pankaj@0987")
//     // login("damini@avioxtechnologies.com", "Damini@1234")

//     // cy.url().should('eq','http://localhost:3000/otp')
//     // const mockOtp = '1234';

//     // // Fill the OTP fields
//     // cy.get('.otpInput').each((element, index) => {
//     //   cy.wrap(element).type(mockOtp[index]);
//     // });

//     // cy.get('form').submit();

//     // Verify redirection to the dashboard after successful login
//     cy.url().should('eq', 'http://localhost:3000/client/dashboard')

//     // Ensure the Overview section is visible after login
//     cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview')
//   })

//   it('should display an error message with invalid credentials', () => {
//     // Perform invalid login
//     login("invalid@domain.com", "InvalidPassword")

//     // Verify error message is displayed for invalid credentials
//     cy.get('.error-message')
//   })
// })


// import 'cypress-iframe';

// // Define a common function for login
// const login = (email, password) => {
//   cy.get("input[name='email']").should('be.visible').type(email)
//   cy.get('input[name="password"]').should('be.visible').type(password)
//   cy.get('button[type="submit"]').should('be.visible').click()
// }

// const yopmailTestEmail = 'pankajClient'; 
// const baseUrl = 'http://localhost:3000'; 

// describe('Login Page', () => {
//   beforeEach(() => {
//     // Load the login page before each test
//     cy.visit(`${baseUrl}/`)
//   })

//   it('should navigate to the dashboard after successful login', () => {
//     // Perform login
//     login("pankajClient@yopmail.com", "Pankaj@0987")
//     // login("damini@avioxtechnologies.com", "Damini@1234")


//     cy.url().should('include', '/otp');


  
//   })

// })










import 'cypress-iframe';

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
    cy.visit('http://localhost:3000')
    // Perform login
    login("Sourav@avioxtechnologies.com", "Sourabrana@3908"); 

    // Wait for the OTP page to load
    cy.url().should('include', '/otp');

    // Fetch the OTP email from Gmail
    cy.task('fetchOtp').then((otp) => {
      // Enter the OTP code into the input fields
      cy.get('.otpInput').each((element, index) => {
        cy.wrap(element).type(otp[index]);
      });

      // Submit the form
      cy.get('form').submit();

      // Verify redirection to the dashboard after successful login
      cy.url().should('eq', `${baseUrl}/client/dashboard`);

      // Ensure the Overview section is visible after login
      cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview');
    });
  });


  // it('should display an error message with invalid credentials', () => {
  //   cy.visit('http://localhost:3000/client/dashboard')
  // //   // Perform invalid login
  // //   login("invalid@domain.com", "InvalidPassword");

  // //   // Verify error message is displayed for invalid credentials
  // //   cy.get('.error-message', { timeout: 10000 }).should('be.visible');
  // });
});
















