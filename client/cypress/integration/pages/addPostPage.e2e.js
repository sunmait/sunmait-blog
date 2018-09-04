import { userAuthorization } from '../../testHelpers/authHelper';

describe('Add post page', () => {
  describe('Create new post', () => {
    beforeEach(() => {
      cy.visit('/');
      userAuthorization();
      cy.get('header [data-cy=create-post]').click();
    });

    it('Add media widget button behaviour', () => {
      cy.log(`Add media widget button should disappear when line is not empty`);
      cy.get('[data-cy=description-container]').find('textarea').type('fewletters');
      cy.get('[data-cy=description-container]').find('[data-cy=add-post-media-widget]').should('not.be.visible');

      cy.log(`Add media widget button should be visible when the carriage is on a new blank line`);
      cy.get('[data-cy=description-container]').find('textarea').type('\n');
      cy.get('[data-cy=description-container]').find('[data-cy=add-post-media-widget]').should('be.visible');

      cy.log(`Add media widget button should be on the same level as the carriage`);
      checkAddMediaWidgetButtonYPosition();
    });
  });

  describe('Edit existing post', () => {

  });
});

function checkAddMediaWidgetButtonYPosition() {
  cy.window()
    .then(win => win.pageYOffset)
    .then(pageScroll => {
      const textareaOffsetFromDocumentTop = Cypress.$('textarea').offset().top;

      const carriagePositionOnSecondLine = 21;
      let carriagePosition = carriagePositionOnSecondLine;

      const distanceFromSvgWrapperToSvg = 14;
      const lineHeight = 19;

      for (var i = 0; i < 5; i++) {
        cy.get('[data-cy=add-post-media-widget]')
          .then(elem => {
            const mediaWidgetYPositionInViewport = elem[0].getBoundingClientRect().y;

            expect(pageScroll + mediaWidgetYPositionInViewport + distanceFromSvgWrapperToSvg)
              .to.equal(textareaOffsetFromDocumentTop + carriagePosition);

            cy.get('[data-cy=description-container]').find('textarea').type('\n');
            carriagePosition += lineHeight;
          });
      }
    });
}
