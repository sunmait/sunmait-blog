import { getPostsByUserId, searchPostsWithLongestName } from '../../testHelpers/postHelper';
import { getUserById, getUserFullName } from '../../testHelpers/userHelper';
import { setLoginState } from '../../testHelpers/authHelper';

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
    beforeEach(() => {
      setLoginState();
      cy.visit('/profile/3');
    });


    it('Profile posts list should be updated on switching to posts of logged-in user', () => {
      // Motivation: https://trello.com/c/nEKpgMVq/79-user-posts-loading-issue

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

    describe('Info tab', () => {
      it(`Profile info 'Save' and 'Reset' buttons behaviour`, () => {

        cy.log(`'Save' and 'Reset' buttons should be disabled while no fields are edited`);
        cy.get('[data-cy=user-profile-form__save-btn]').should('be.disabled');
        cy.get('[data-cy=user-profile-form__reset-btn]').should('be.disabled');

        cy.get('[data-cy=user-profile-form]').find('input').each(input => {
          const initialInputVal = input[0].value;

          cy.log(`'Save' and 'Reset' buttons should not be disabled when at least one field is changed`);
          cy.wrap(input).type('str');
          cy.get('[data-cy=user-profile-form__save-btn]').should('not.be.disabled');
          cy.get('[data-cy=user-profile-form__reset-btn]').should('not.be.disabled');

          cy.log(`'Reset' button should return fields input values to the initial`);
          cy.get('[data-cy=user-profile-form__reset-btn]').click();
          cy.wrap(input).should('have.value', initialInputVal);
          
          cy.log(`'Save' button should be disabled when fileds input values are invalid`);
          cy.wrap(input).clear().type('A');
          cy.get('[data-cy=user-profile-form__save-btn]').should('be.disabled');
          cy.get('[data-cy=user-profile-form__reset-btn]').should('not.be.disabled');
          
          cy.get('[data-cy=user-profile-form__reset-btn]').click();
        });
      });

      it(`User info should be editable`, () => {
        const userFullName = getUserFullName();
        const [userFirstName, userLastName] = userFullName.split(' '); 
        const str = 'str';

        cy.get('[data-cy=user-profile-form]').find('input').each(input => {
          cy.wrap(input).type(str);
        });

        cy.get('[data-cy=user-profile-form__save-btn]').click();
        cy.get('[data-cy=confirm-btn]').click();

        cy.get('[data-cy=user-profile-form]').find('input').eq(0).should('have.value', userFirstName+str);
        cy.get('[data-cy=user-profile-form]').find('input').eq(1).should('have.value', userLastName+str);
        cy.get('[data-cy=header__user-info-name]').should('have.text', `${userFirstName}str ${userLastName}str`);
      });
    });
  });
});

function checkingProfileHeader(user) {
  cy.log('profile header should have user avatar');
  cy.get('[data-cy=header__avatar]').should('be.visible').find('img').should('have.attr', 'src', `${user.PhotoUrl}`);

  cy.log('profile header should have user name and surname');
  cy.get('[data-cy=userProfile__header-name-surname]').should('be.visible').should('have.text', `${user.FirstName} ${user.LastName}`);
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