const login = (email, password) => {
  cy.get("input[name='email']").should('be.visible').type(email)
  cy.get('input[name="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').should('be.visible').click()
}
const baseUrl = 'http://localhost:3000';

describe('Other Test File', () => {
  beforeEach(() => {
    // Load the login page before each test
    cy.visit('http://localhost:3000/admin-login')
  })

  it('should navigate to the dashboard after successful login', () => {
    // Perform login using the imported function
    login("rexett_admin@yopmail.com", "admin@123")
    cy.get('form').submit();
    cy.get('h2.section-head', { timeout: 10000 }).should('be.visible').and('contain', 'Overview');
    cy.get('.active > div > .overview-card-subhead')
    cy.get(':nth-child(2) > div > .overview-card-subhead')

    //Verify Total revenue section 
    cy.get(':nth-child(3) > .row > :nth-child(1) > .card-box')
    cy.get('.revenue-graph > canvas')

    //Verify Activity logs section 
    cy.get(':nth-child(3) > .row > :nth-child(2) > .card-box > .d-flex > .section-head')
    cy.get('table.table-ui-custom').should('be.visible');
    cy.get('table thead tr th').eq(0).should('have.text', 'Date');
    cy.get('table thead tr th').eq(1).should('have.text', 'Activity');
    cy.get('table thead tr th').eq(2).should('have.text', 'Time');

    //Verify List of clients section !
    cy.get('.col-md-12 > .d-flex > .section-head-sub').should("have.text", "List Of Clients")
    cy.get('.col-md-12 > .d-flex > .section-head-sub')
  })
})