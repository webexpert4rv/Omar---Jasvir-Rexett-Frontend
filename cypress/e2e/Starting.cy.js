describe('Title and Project URL Test', () => {
  it('should visit the project homepage and verify the title and URL', () => {
    // Visit the URL
    cy.visit('http://localhost:3000/')

    // Verify the URL
    cy.url().should('eq', 'http://localhost:3000/')

    // Verify the title of the project
    cy.title().should('include', 'Rexett')
  })
})