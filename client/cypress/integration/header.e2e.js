import { setLoginState, testUserIsLoggedOut, testUserIsLoggedIn } from '../testHelpers/authHelper';
import { getUserFullName, getAuthorizedUser } from '../testHelpers/userHelper';
import user from '../fixtures/userToLogin.json';

describe('Header', () => {
  it('should exist on page', () => {
    cy.visit('/');
    cy.get('header').should('be.visible');
  });

  describe('for not authorized user', () => {
    it('should has logo with image', () => {
      cy.visit('/');
      cy.get('header .header__logo').should('have.css', 'background-image');
    });

    it('should has login button', () => {
      cy.visit('/');
      cy.get('[data-cy=login-btn]').should('be.visible');
    });
  });

  describe('login modal', () => {
    it('login button should open modal and user able to login with it', () => {
      cy.visit('/');

      cy.log('click on login btn');
      cy.get('[data-cy=login-btn]').click();

      cy.log('check modal is shown');
      cy.get('[data-cy=login-modal]').should('be.visible');

      cy.log('fil form with user`s data');
      cy.get('[data-cy=login-modal] input[name=login]').type(user.Login);
      cy.get('[data-cy=login-modal] input[name=password]').type(user.Password);

      cy.log('press submit button');
      cy.get('[data-cy=login-modal] button[type=submit]').click();

      cy.log('authorized panel with user data and menu is visible');
      cy.get('.header--for-authorised').should('be.visible')
        .then(testUserIsLoggedIn);
    });
  });

  describe('for authorized user', () => {
    const avatarSelector = 'header [data-cy=avatar]';

    beforeEach(() => {
      setLoginState();

      cy.visit('/');
    });

    it('should has create post button', () => {
      cy.get('header [data-cy=create-post]').should('be.visible');
    });

    it('should has full name of authorized user', () => {
      const fullName = getUserFullName();
      cy.get('header').contains(fullName);
    });

    it('should has avatar of authorized user', () => {
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
          .then(testUserIsLoggedOut);
      });
    });
  });
});
