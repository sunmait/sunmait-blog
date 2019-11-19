import { setLoginState } from '../../testHelpers/authHelper';
import 'cypress-file-upload';

describe('Settings page', () => {
  beforeEach(() => {
      cy.server()
      cy.route('/api/users/3/*').as('api')
  });

  it('Should be on "Change password page"', () => {

    setLoginState();
    cy.visit('/profile/3/settings')
    cy.wait(['@api', '@api'])
    cy.get('[data-cy=settings-tabs]')
      .find('[data-cy=settings-tabs-tab]')
      .contains('Change password')
      .click();
    cy.log('Is on "Change password page"');
    cy.get('[data-cy=settings-tabs]')
      .find('[data-cy=settings-tabs-tab]')
      .contains('Change password')
      .click();
    cy.log('Should fill inputes successfully');
    cy.get('[data-cy=form-change-password]')
      .find('input[type="password"]')
      .should('have.length', 3);
  });

  describe('Validation on inputes', () => {
    beforeEach(() => {
      setLoginState();
      cy.visit('/profile/3/settings')
      cy.wait(['@api', '@api'])
      cy.get('[data-cy=settings-tabs]')
        .find('[data-cy=settings-tabs-tab]')
        .contains('Change password')
        .click();
    });

    it('Password is empty', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          const newPassword = 'qwerty';
          if (index === 0) {
            input.focus();
          } else {
            cy.wrap(input).type(newPassword);
            input.focus();
          }
        });
      cy.get('[data-cy=password]')
        .find('p')
        .contains('Enter your password');
    });

    it('Password and new password are empty', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          const newPassword = 'qwerty';
          if (index === 0 || index === 1) {
            input.focus();
          } else {
            cy.wrap(input).type(newPassword);
          }
        });
      cy.get('[data-cy=password]')
        .find('p')
        .contains('Enter your password');
      cy.get('[data-cy=newPassword]')
        .find('p')
        .contains('Enter your password');
    });

    it('Password, new password and repeat are empty', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          input.focus();
        })
        .each((input, index) => {
          input.focus();
        });
      cy.get('[data-cy=password]')
        .find('p')
        .contains('Enter your password');
      cy.get('[data-cy=newPassword]')
        .find('p')
        .contains('Enter your password');
      cy.get('[data-cy=repeatPassword]')
        .find('p')
        .contains('Repeat your password');
    });

    it('Password value = "!"', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          if (index === 0) {
            cy.wrap(input).type('!');
          }
        })
        .each((input, index) => {
          if (index === 1) {
            input.focus();
          }
        });
      cy.get('[data-cy=password]')
        .find('p')
        .contains('Password must contain only numbers or digits');
    });

    it('Password length<4', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          if (index === 0) {
            cy.wrap(input).type('1a3');
          }
        })
        .each((input, index) => {
          if (index === 1) {
            input.focus();
          }
        });
      cy.get('[data-cy=password]')
        .find('p')
        .contains('Password must contain at least 4 characters');
    });

    it('Password length>16', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          if (index === 0) {
            cy.wrap(input).type('111aaaaaaaa11111111111111111111111111111aa');
          }
        })
        .each((input, index) => {
          if (index === 1) {
            input.focus();
          }
        });
      cy.get('[data-cy=password]')
        .find('p')
        .contains('Password must contain max 16 characters');
    });

    it('New and repeat passwords are not equal', () => {
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          if (index === 1) {
            cy.wrap(input).type('1111');
          }
          if (index === 2) {
            cy.wrap(input).type('1112');
          }
        })
        .each((input, index) => {
          if (index === 0) {
            input.focus();
          }
        });
      cy.get('[data-cy=repeatPassword]')
        .find('p')
        .contains('Passwords do not match');
    });
  });

  describe('Password changing', () => {
    it('Entered a password that doesnt match anyone', () => {
      setLoginState();
      cy.visit('/profile/3/settings')
      cy.wait(['@api', '@api'])
      cy.get('[data-cy=settings-tabs]')
        .find('[data-cy=settings-tabs-tab]')
        .contains('Change password')
        .click();
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          const newPassword = 'qwerty';
          if (index === 0) {
            cy.wrap(input).type('1235');
          } else {
            cy.wrap(input).type(newPassword);
          }
        });
      cy.get('[data-cy=form-change-password]')
        .find('input[name="password"]')
        .should('have.value', '1235');
      cy.get('[data-cy=form-change-password]')
        .find('input[name="newPassword"]')
        .should('have.value', 'qwerty');
      cy.get('[data-cy=form-change-password]')
        .find('input[name="repeatPassword"]')
        .should('have.value', 'qwerty');

      cy.log('Password shouldt change succesfully (invalid password)');
      cy.get('[data-cy=form-change-password]')
        .find('button[type="submit"]')
        .click();
      cy.get('.toasts-container')
        .should('be.visible')
        .contains('Invalid password');
    });

    it('Password should change successfully from "1234" to "qwerty"', () => {
      setLoginState({ Login: 'chornycmok', Password: '1234' });
      cy.visit('/profile/3/settings')
      cy.wait(['@api', '@api'])
      cy.get('[data-cy=settings-tabs]')
        .find('[data-cy=settings-tabs-tab]')
        .contains('Change password')
        .click();
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          const newPassword = 'qwerty';
          if (index === 0) {
            cy.wrap(input).type('1234');
          } else {
            cy.wrap(input).type(newPassword);
          }
        });
      cy.get('[data-cy=form-change-password]')
        .find('input[name="password"]')
        .should('have.value', '1234');
      cy.get('[data-cy=form-change-password]')
        .find('input[name="newPassword"]')
        .should('have.value', 'qwerty');
      cy.get('[data-cy=form-change-password]')
        .find('input[name="repeatPassword"]')
        .should('have.value', 'qwerty');

      cy.log('Toasts-container with "Password has been changed" should be visible');
      cy.get('[data-cy=form-change-password]')
        .find('button[type="submit"]')
        .click();
      cy.get('.toasts-container')
        .should('be.visible')
        .contains('Password has been changed');
      cy.log('Password has been changed from "1234" to "qwerty"');
    });

    it('Password should change back successfully from "qwerty" to "1234"', () => {
      setLoginState({ Login: 'chornycmok', Password: 'qwerty' });
      cy.visit('/profile/3/settings')
      cy.wait(['@api', '@api'])
      cy.get('[data-cy=settings-tabs]')
        .find('[data-cy=settings-tabs-tab]')
        .contains('Change password')
        .click();
      cy.get('[data-cy=form-change-password]')
        .find('input[type="password"]')
        .each((input, index) => {
          const newPassword = '1234';
          if (index === 0) {
            cy.wrap(input).type('qwerty');
          } else {
            cy.wrap(input).type(newPassword);
          }
        });
      cy.get('[data-cy=form-change-password]')
        .find('input[name="password"]')
        .should('have.value', 'qwerty');
      cy.get('[data-cy=form-change-password]')
        .find('input[name="newPassword"]')
        .should('have.value', '1234');
      cy.get('[data-cy=form-change-password]')
        .find('input[name="repeatPassword"]')
        .should('have.value', '1234');

      cy.log('Toasts-container with "Password has been changed" should be visible');
      cy.get('[data-cy=form-change-password]')
        .find('button[type="submit"]')
        .click();
      cy.get('.toasts-container')
        .should('be.visible')
        .contains('Password has been changed');
      cy.log('Password has been changed from "qwerty" to "1234"');
    });
  });
});
