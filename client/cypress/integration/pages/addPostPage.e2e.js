import { setLoginState } from '../../testHelpers/authHelper';
import 'cypress-file-upload';
import { addTag } from '../../testHelpers/postHelper';
describe('Add post page', () => {
  describe('Create new post', () => {
    beforeEach(() => {
      setLoginState();
      cy.visit('/');
      cy.get('header [data-cy=create-post]').click();
    });
    it('Add Tags functionality', () => {
      let text = 'Test';
      cy.get('[data-cy=tags-input]').type(text + '{enter}');
      cy.get('[data-cy=tags-input]').type('tag' + '{enter}');
      cy.get('.add-post-form__chip').should('have.length', 2);
      cy.get('[data-cy=tag-item0]')
        .find('span')
        .should('have.text', text);
      cy.get('[data-cy=tag-item0]')
        .find('svg')
        .click();
      cy.get('.add-post-form__chip').should('have.length', 1);
    });
    it('Add media widget button behaviour', () => {
      cy.log(`Add media widget button should disappear when line is not empty`);
      cy.get('[data-cy=title-container]')
        .find('input.MuiInputBase-input')
        .type("Test-post, don't touch it");
      cy.get('[data-cy=description-container]')
        .find('textarea')
        .type("Hi, please don't touch or modify this post!\n" + '\n' + '@mineralsfree');
      cy.get('[data-cy=description-container]')
        .find('[data-cy=add-post-media-widget]')
        .should('not.be.visible');

      cy.log(`Add media widget button should be visible when the carriage is on a new blank line`);
      cy.get('[data-cy=description-container]')
        .find('textarea')
        .type('\n');
      cy.get('[data-cy=description-container]')
        .find('[data-cy=add-post-media-widget]')
        .should('be.visible');

      cy.log(`Add media widget button should be on the same level as the carriage`);
      checkAddMediaButtonPosition();
    });
    it('Add post and check if it is displayed on Main page', () => {
      const fileName = 'images/Test_image.png';
      cy.log('Uploading post cover image');
      cy.fixture(fileName).then(fileContent => {
        cy.get('input[type=file]').upload({ fileContent, fileName, mimeType: 'image/png' });
      });
      cy.log('adding heading');
      const heading = 'THIS IS A TEST ';
      cy.get('[data-cy=title-container]')
        .find('input.MuiInputBase-input')
        .type(heading);
      cy.log('adding Description');
      cy.get('[data-cy=description-container]')
        .find('textarea')
        .type("Hi, please don't touch or modify this post!  @mineralsfree qwertyuiqwertyui");
      addTag('Test');
      addTag('TAG');
      cy.wait(1500);
      cy.log('submitting form');
      cy.get('[data-cy=publish-post-button]').click();
      cy.log('finding post on the home page');
      cy.wait(500);
      cy.get('[data-cy=posts-list__searchbar]')
        .find('input')
        .type(heading);
      cy.get('[data-cy=main-page-post]').should('have.length.of.at.least', 1);
      cy.get('[data-cy=post-content]')
        .first()
        .get('.add-post-form__chip')
        .should('have.length', 2);
    });

    it('Position of media inserted by add media widget button', () => {
      cy.log(
        'Media should be inserted on line where carriage was at the time of insertion, without adding empty lines'
      );
      // This test was motivated by earlier insert behaviour, when media was inserted with two empty lines above and below media itself
      cy.get('[data-cy=description-container]')
        .find('textarea')
        .type('fewletters\n');
      cy.get('[data-cy=add-post-media-widget]').click();
      cy.get('[data-cy=img-url-hidden-input-open-btn]').click();
      cy.get('[data-cy=menu-item-hidden-input]')
        .find('input')
        .type('https://nonExistentFakeUrl.com/nonExistent.jpg');
      cy.get('[data-cy=img-url-hidden-input-open-btn]').click();
      cy.get('[data-cy=description-container]')
        .find('textarea')
        .then(txtArea => {
          const text = txtArea[0].value;
          expect(text.match(/\n/g).length).to.equal(1);
        });
    });
  });
});
// making sure that addMedia button is on the same height with cursor
function checkAddMediaButtonPosition() {
  cy.window()
    .then(win => win.pageYOffset)
    .then(pageScroll => {
      const textareaOffsetFromDocumentTop = Cypress.$('textarea').offset().top;
      const initialCarrigePosition = 59;
      let carriagePosition = initialCarrigePosition;

      const distanceFromSvgWrapperToSvg = 14;
      const lineHeight = 19;

      /* eslint no-loop-func: 0 */
      for (var i = 0; i < 5; i++) {
        cy.get('[data-cy=add-post-media-widget]').then(elem => {
          const mediaWidgetYPositionInViewport = elem[0].getBoundingClientRect().y;

          expect(pageScroll + mediaWidgetYPositionInViewport + distanceFromSvgWrapperToSvg).to.equal(
            textareaOffsetFromDocumentTop + carriagePosition
          );

          cy.get('[data-cy=description-container]')
            .find('textarea')
            .type('\n');
          carriagePosition += lineHeight;
        });
      }
    });
}
