import { setLoginState, testUserIsLoggedOut } from '../testHelpers/authHelper';
import { getUserFullName, getAuthorizedUser } from '../testHelpers/userHelper';

describe('Header', () => {
  it('should exists on page', () => {
    cy.visit('/');

    cy.get('header').should('be.visible');
  });

  it('should have the logo image', () => {
    cy.visit('localhost:3000');

    cy.get('header .header__logo').should('have.css', 'background-image');
  });

  it('should have login button for not authorized user', () => {
    cy.visit('/');

    cy.get('[data-cy=login-btn]').should('be.visible');
  });

  describe('for authorized user', () => {
    const avatarSelector = 'header [data-cy=avatar]';

    beforeEach(() => {
      setLoginState();

      cy.visit('/');
    });

    it('should have `create new post` button', () => {
      cy.get('header [data-cy=create-post]').should('be.visible');
    });

    it('should show full name of authorizd user', () => {
      const fullName = getUserFullName();

      cy.get('header').contains(fullName);
    });

    it('should show avatar of authorized user', () => {
      cy.get(`${avatarSelector} img`).should('be.visible');
    });

    describe('user menu', () => {
      const openMenu = () => {
        cy.get(avatarSelector).click();
      };

      it('should open user popover menu by click on avatar', () => {
        cy.get(avatarSelector).click();
        cy.get('[data-cy=user-menu]').should('be.visible');
      });

      it('should open user popover menu by click on full name', () => {
        const fullName = getUserFullName();

        cy.get('header').contains(fullName).click();
        cy.get('[data-cy=user-menu]').should('be.visible');
      });

      it('user menu should have `Profile` item that lead to Profile page', () => {
        openMenu();

        cy.get('[data-cy=user-menu] li').contains('Profile').click();

        cy.location().should(a => {
          const userData = getAuthorizedUser();
          expect(a.pathname).to.eq(`/profile/${userData.id}`);
        });
      });

      it('user menu should have `My Posts` item that lead to user`s posts page', () => {
        openMenu();

        cy.get('[data-cy=user-menu] li').contains('My posts').click();

        cy.location().should(a => {
          expect(a.pathname).to.eq('/myposts');
        });
      });

      it('user menu should have `Log Out` item that does log out', () => {
        openMenu();

        cy.get('[data-cy=user-menu] li').contains('Log Out').click();

        cy.get('[data-cy=login-btn]').should('be.visible');
        cy.get('.header--for-authorised').should('not.be.visible')
          .then(() => {
            testUserIsLoggedOut();
          });
      });
    });
  });
});
