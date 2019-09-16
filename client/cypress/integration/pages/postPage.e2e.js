import { getPosts } from '../../testHelpers/postHelper';
import { getUserById } from '../../testHelpers/userHelper';

describe('Post page', () => {
  describe('Post that does not belong to current user', () => {
    it('Post info', () => {
      cy.visit('/post/1');

      getPosts().then(response => {
        const firstPost = response.body[response.body.length - 1];

        cy.log('post should have image');
        cy.get('[data-cy=post-image]')
          .then(elemWithImg => {
            expect(elemWithImg[0].src.includes(firstPost.ImageUrl)).to.eq(true);
          })
          .should('be.visible');

        cy.log('main post image width should be the full width of the screen on different screen resolutions');
        const viewPortWidthValues = [449, 501, 551, 761, 851, 1301];

        viewPortWidthValues.forEach(width => {
          cy.viewport(width, 900);

          cy.document().then(doc => {
            const imgWidth = parseInt(Cypress.$('.article__main-post-page-image').css('width'));

            expect(doc.documentElement.clientWidth).to.eq(imgWidth);
          });
        });

        cy.log('post should have title');
        cy.get('[data-cy=post-title]').contains(firstPost.Title);

        cy.log('post should have author');
        getUserById(firstPost.UserId).then(user => {
          cy.get('[data-cy=post-author]')
            .contains(user.FirstName)
            .should('be.visible');
        });

        cy.log('post should have publication date');
        const publishingDate = Cypress.moment(firstPost.CreatedAt).format('MMM D, YYYY');

        cy.get('[data-cy=post-publication-date]')
          .should('be.visible')
          .contains(publishingDate);

        cy.log('post should have updating date');

        const updatingDate = Cypress.moment(firstPost.UpdatedAt).format('MMM D, YYYY');
        cy.get('[data-cy=post-updating-date')
          .should('be.visible')
          .contains(updatingDate);

        cy.log('post should have description');
        cy.get('.post-preview__description').should('be.visible');

        cy.log('post should not have edit button');
        cy.get('[data-cy=edit-post-button]').should('not.be.visible');

        cy.log('post should not have delete button');
        cy.get('[data-cy=delete-post-button]').should('not.be.visible');
      });
    });

    it('post should have share on twitter button', () => {
      cy.visit('/post/1', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').returns({ focus: false });
        },
      });

      cy.get('[data-cy=twitter-share-button]').click();

      cy.log('button should open new window');
      cy.window()
        .its('open')
        .should('be.called');

      cy.log('new window url should lead to twitter share dialog');
      cy.window().then(window => {
        expect(window.open.args[0][0]).to.include('twitter.com/share');
      });
    });

    it('post should have share on facebook button', () => {
      cy.visit('/post/1', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').returns({ focus: false });
        },
      });

      cy.get('[data-cy=facebook-share-button]').click();

      cy.log('button should open new window');
      cy.window()
        .its('open')
        .should('be.called');

      cy.log('new window url should lead to facebook share dialog');
      cy.window().then(window => {
        expect(window.open.args[0][0]).to.include('facebook.com/sharer');
      });
    });
  });

  describe('Post that belongs to current user', () => {});
});
