import {} from '../../testHelpers/postHelper';
import { getUserById } from '../../testHelpers/userHelper';
import { getComments, getPost, getPosts } from '../../testHelpers/postHelper';
import user from '../../fixtures/userToLogin.json';
import { format } from 'date-fns';

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
  describe('Comments of current post', () => {
    it('View comments to current post', () => {
      cy.visit('/post/1', {
        onBeforeLoad(win) {
          cy.stub(win, 'open').returns({ focus: false });
        },
      });
      getComments(1).then(comments => {
        cy.get('.MuiListItem-gutters').should('have.length', comments.body.length);
      });
    });

    it('Add comment to current post', () => {
      cy.visit('/post/1');

      cy.log(`
        there is no text input to add comment because user is not authorized.
        Instead there is a button to login'
      `);

      cy.get('.textarea').should('not.be.visible');

      cy.log('click on login btn');
      cy.get('[data-cy=login-btn-for-add-comment]').click();

      cy.log('check modal is shown');
      cy.get('[data-cy=login-modal]').should('be.visible');

      cy.log('fil form with user`s data');
      cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
      cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);

      cy.log('press submit button');
      cy.get('[data-cy=login-modal] button[type=submit]').click();

      cy.log('authorized panel with user data and menu is visible');

      getComments(1).then(comments => {
        const length = comments.body.length;
        cy.get('[data-cy=post-comment] textarea[name=commentDescription]').type('privet, kak dela?');
        cy.get('[data-cy=add-btn-for-add-comment]').click();
        cy.get('.MuiListItem-gutters').should('have.length', length + 1);
        cy.get('[data-cy=comment-auth]')
          .last()
          .contains('Hannah');
        cy.log('Auth of who wrote comment is correct');
        cy.get('[data-cy=comment-text]')
          .last()
          .contains(' - privet, kak dela?');
        cy.log('Text of comment is correct');
        let newDate = format(Date.now(), 'MMM D, YYYY');
        cy.get('[data-cy=comment-date]')
          .last()
          .contains(newDate);
        cy.log('Date of comment is correct');
      });
    });

    it('Check enter correct number of characters of comment', () => {
      cy.visit('/post/1');

      cy.log(`
        there is no text input to add comment because user is not authorized.
        Instead there is a button to login'
      `);

      cy.get('.textarea').should('not.be.visible');

      cy.log('click on login btn');
      cy.get('[data-cy=login-btn-for-add-comment]').click();

      cy.log('check modal is shown');
      cy.get('[data-cy=login-modal]').should('be.visible');

      cy.log('fil form with user`s data');
      cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
      cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);

      cy.log('press submit button');
      cy.get('[data-cy=login-modal] button[type=submit]').click();

      cy.log('authorized panel with user data and menu is visible');

      cy.get('[data-cy=post-comment] textarea[name=commentDescription]').type(
        'hdfghdgfh dfgh dfgh dfgh dfg hdfg hdfgh dfgh dfgh dfgh dfgh dfgh dfgh dfgh dfghdfgh dfgh dfgh dfg hdfg hdfghdfg hdfgh dfgh dfgh df'
      );
      cy.get('[data-cy=comment-warning-text]').contains('20 characters remaining');
      cy.log('To the end 20 characters remaining');

      cy.get('[data-cy=post-comment] textarea[name=commentDescription]').type(
        'sdgfdf dsf gsdfg sdgf sdfgsdgf sdf gsdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdfg sdf gsdfg dsf gsdfg sdf gdsfg dsf gsdf gsdfgdsf gdsf gsdfg sdf gsdfg sdfgs'
      );
      cy.get('[data-cy=comment-warning-text]').contains(
        'Number of characters exceeded 150. Enter 150 characters or less'
      );
      cy.log('Entered more than 150 characters');
    });
  });

  describe('Likes of current post ', () => {
    it('Check success add like or dislike', () => {
      cy.visit('/post/1');

      cy.log('click on login btn');
      cy.get('[data-cy=login-btn-for-add-comment]').click();

      cy.log('check modal is shown');
      cy.get('[data-cy=login-modal]').should('be.visible');

      cy.log('fil form with user`s data');
      cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
      cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);

      cy.log('press submit button');
      cy.get('[data-cy=login-modal] button[type=submit]').click();

      getPost(1).then(post => {
        const length = post.body.Likes.length;
        cy.log('Click on like button');
        cy.get('[data-cy=like-button]').click();

        cy.log('Check that color of like changed when click in like-button');
        cy.get('[data-cy=like-color]')
          .wrap({ color: 'error' })
          .its('color')
          .should('eq', 'error');

        cy.log('Check that number of likes changed');
        cy.get('[data-cy=like-number]')
          .contains(post.body.Likes.length)
          .should('not.have.length', length);
      });
    });

    it('Check not add like if user not authorized', () => {
      cy.visit('/post/1');
      getPost(1).then(post => {
        const length = post.body.Likes.length;
        cy.log('Click on like button');
        cy.get('[data-cy=like-button]').click();

        cy.log('Check that number of likes not changed if user not authorized');
        cy.get('[data-cy=like-number]').contains(length);
      });
    });
  });
  describe('Test for rating feature', () => {
    it('Visible Post rating', () => {
      cy.visit('/post/9');
      cy.get('[data-cy=overall-post-rating]').should('be.visible');
    });
    it('Unvisible user rating if you not auth', () => {
      cy.log('You can not see user rating if you not authorized');
      cy.get('[data-cy=user-rating]').should('not.be.visible');
    });
    it('Check rating functionality', () => {
      cy.log('click on Log In btn');
      cy.get('[data-cy=login-btn-for-add-comment]').click();

      cy.log('Check modal visible');
      cy.get('[data-cy=login-modal]').should('be.visible');

      cy.log('Filling form ');
      cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
      cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);

      cy.log('Press Log In button');
      cy.get('[data-cy=login-modal] button[type=submit]').click();
      cy.get('[data-cy=user-rating]').should('be.visible');

      getPost(9).then(() => {
        cy.log('click at stars');
        cy.get('[data-cy=user-rating] label[for=simple-controlled-1]')
          .click()
          .find('span')
          .should($span => {
            expect($span[0].className).to.match(/-iconFilled/);
          });
      });
      getPost(9).then(() => {
        cy.log('check average post rating');
        cy.get('[data-cy=overall-post-rating] span[role=img]')
          .find('span')
          .should($span => {
            expect($span[0].className).to.match(/-iconFilled/);
          });
      });
    });
  });
});
