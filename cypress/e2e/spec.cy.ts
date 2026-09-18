/// <reference types="cypress" />

const BASE_PARAMS = 'page=0&pageLimit=10&sortField=postedAt&sortOrder=desc'

describe('Job listing', () => {
    it('shows 3 jobs for postalCode=76133 + seniorityLevel=Senior, then clears to all 28', () => {
        cy.visit(`/?${BASE_PARAMS}&postalCode=76133&seniorityLevel=Senior`)

        cy.contains('p', '3 jobs found')
        // If one page of results is shown, the pagination controls are not rendered
        cy.contains('span', 'Page 1 of 1').should('not.exist')
        cy.get('main').find('h3').should('have.length', 3)

        cy.contains('button', 'Advanced filters').click()
        cy.contains('button', 'Clear filters').click()

        cy.contains('p', '28 jobs found')
        cy.contains('span', 'Page 1 of 3')
        cy.get('main').find('h3').should('have.length', 10)

        cy.get('button[aria-label="Next page"]').click()
        cy.contains('span', 'Page 2 of 3')
        cy.get('main').find('h3').should('have.length', 10)
    })
})
