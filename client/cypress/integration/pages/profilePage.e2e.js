import { getPostsByUserId, searchPostsWithLongestName } from '../../testHelpers/postHelper';
import { getUserById } from '../../testHelpers/userHelper';
import { userAuthorization } from '../../testHelpers/authHelper';

describe('Profile page', () => {
  describe('Profile that does not belong to current user', () => {
    describe('Profile content common for all profile sections', () => {
      beforeEach(() => {
        cy.visit('/profile/1');
      });

      it('Profile header', () => {
        getUserById(1)
          .then((user) => {
            checkingProfileHeader(user);
          });
      });

      it('Navigation menu tabs lead to correct pages', () => {
        checkingProfileNavigationMenu();
      });
    });

    describe('`Info` tab', () => {
      beforeEach(() => {
        cy.visit('/profile/1');
      });

      it('Profile content on "Info" tab', () => {
        cy.log('"Info" profile page section should have navigation menu with active "Info" tab and muted other tabs');
        checkingCorrectTabIsActive('Info');
      });
    });

    describe('`Posts` tab', () => {
      beforeEach(() => {
        cy.visit('/profile/1/posts');
      });

      it('Profile content on "Posts" tab', () => {
        cy.log('"Posts" profile page section should have navigation menu with active "Posts" tab and muted other tabs');
        checkingCorrectTabIsActive('Posts');

        cy.log('"Posts" section should have list of posts which belongs to selected user ');
        getUserById(1)
          .then((user) => {
            getPostsByUserId(1)
              .then((postsOfSelectedUser) => {
                cy.get('.article__container [data-cy=post-author]').should('have.length', postsOfSelectedUser.length)
                  .each(span => {
                    cy.wrap(span).contains(user.FirstName);
                  });
              })
          });
      });

      it('"Posts" section should have search bar that should filter posts by title', () => {
        getPostsByUserId(1)
          .then((postsOfSelectedUser) => {
            cy.log('After searching amount of posts on page should be equal to amount of posts whose titles corresponds to search query');
            searchPostsWithLongestName(postsOfSelectedUser);

            cy.log('Search with search query value that does not correspond any post title should leads to absence of posts on page');
            cy.get('form input[name=searchQuery]').type('somerandomtext');
            cy.get('.article__container .article__title').should('have.length', 0);
          })
      });
    });
  });

  describe('Profile that belongs to current user', () => {
    it('Profile posts list should be updated on switching to posts of logged-in user', () => {
      // Motivation: https://trello.com/c/nEKpgMVq/79-user-posts-loading-issue

      cy.visit('/');
      userAuthorization();

      cy.visit('/profile/1/posts');

      cy.get('header [data-cy=avatar]').click();
      cy.get('[data-cy=user-menu] li').contains('My posts').click();

      getUserById(3)
        .then((user) => {
          getPostsByUserId(3)
            .then((postsOfSelectedUser) => {
              cy.get('.article__container [data-cy=post-author]').should('have.length', postsOfSelectedUser.length)
                .each(span => {
                  cy.wrap(span).contains(user.FirstName);
                });
            })
        });
      checkingCorrectTabIsActive('Posts');
    });
  });
});

function checkingProfileHeader(user) {
  cy.log('profile header should have user avatar');
  cy.get('[data-cy=header__avatar]').should('be.visible').find('img').should('have.attr', 'src', `${user.PhotoUrl}`);

  cy.log('profile header should have user name and surname');
  cy.get('[data-cy=header__name-surname]').should('be.visible').contains(`${user.FirstName} ${user.LastName}`);
}

function checkingProfileNavigationMenu() {
  cy.log('`Posts` tab');
  cy.get('[data-cy=nav-container]')
    .find('[data-cy=nav-container__tab]').contains('Posts')
    .click()
  cy.location('pathname').should('eq', '/profile/1/posts');

  cy.log('`Info` tab');
  cy.get('[data-cy=nav-container]')
    .find('[data-cy=nav-container__tab]').contains('Info')
    .click();
  cy.location('pathname').should('eq', '/profile/1');
}

function checkingCorrectTabIsActive(tabName) {
  cy.get('[data-cy=nav-container]')
    .find('.active')
    .should('have.length', 1)
    .contains(tabName);
}