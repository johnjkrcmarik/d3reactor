describe('Pie Chart', () => {
  it('should show pie chart', () => {
    cy.visit('localhost:8080');
    cy.get('[data-testid = pie-chart]')
      .should('be.visible')
      .and((chart) => {
        expect(chart.height()).to.be.greaterThan(480);
      });
    cy.get('[data-testid = pie-chart-legend]')
      .should('be.visible')
      .should('contain', 'fruit');
    cy.get('[data-testid = pie-chart-arc-text-2]')
      .should('be.visible')
      .should('contain', '30');
    cy.get('[data-testid = pie-chart-arc-2]').trigger('mouseover');
    //TODO: investigate why the tooltip is not visible
    // cy.get('[data-testid = tooltip-pie-chart]').should('be.visible');
  });
});
