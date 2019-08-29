import {
  getPosts,
  searchPostsWithLongestName,
  testAmountOfPosts,
  searchPostInputPath,
} from '../../testHelpers/postHelper';
import { getUserById } from '../../testHelpers/userHelper';

describe('Home page. Posts', () => {
  describe('Search bar', () => {
    it('search bar should be on a page', () => {
      cy.visit('/');

      cy.get(searchPostInputPath).should('be.visible');
    });

    it('should filter posts by name', () => {
      cy.visit('/');

      getPosts().then(response => {
        const posts = response.body;
        searchPostsWithLongestName(posts);
      });
    });

    it('should show `No posts` text if there are no posts for search', () => {
      cy.visit('/');

      const nonExistingPostTitle = 'blablabla';

      cy.get(searchPostInputPath).type(nonExistingPostTitle);
      cy.get(`[data-cy=no-posts-message]`).should('be.visible');
    });
  });

  describe('Lazy load of posts', () => {
    it('Should load 12 posts at first and 3 more after scroll to bottom of the page(desktop view)', () => {
      cy.visit('/');
      // When we visit '/' we are on the bottom of the page(according to previous test scenario),
      // so we use scrollTo(0) and wait(100) to scroll to the top of the page, for lazy load of posts
      cy.scrollTo(0);
      cy.wait(100);
      testAmountOfPosts(12);
      cy.scrollTo('bottom');
      testAmountOfPosts(16);
    });

    it('Should load 12 posts at first and 4 more after scroll to bottom of the page(tablet view)', () => {
      cy.visit('/');
      cy.viewport(900, 900);
      testAmountOfPosts(12);
      cy.scrollTo(0);
      cy.wait(100);
      cy.scrollTo('bottom');
      testAmountOfPosts(16);
    });

    it('Should load 12 posts at first and 2 more after scroll to bottom of the page(mobile view)', () => {
      cy.visit('/');
      cy.viewport(700, 900);
      testAmountOfPosts(12);
      cy.scrollTo(0);
      cy.wait(100);
      cy.scrollTo('bottom');
      testAmountOfPosts(14);
      cy.wait(100);
      cy.scrollTo('bottom');
      testAmountOfPosts(16);
    });
  });

  describe('Post info', () => {
    const getPostByTitle = title =>
      cy
        .get('.article__title')
        .contains(title)
        .parents('.article__container');

    it('Post info', () => {
      cy.visit('/');

      getPosts().then(response => {
        const firstPost = response.body[0];

        /* ----------------------------------------- */
        cy.log('post should have image');
        getPostByTitle(firstPost.Title)
          .find('.article__main-post-preview-image')
          .then(a => {
            expect(a[0].style.backgroundImage.includes(firstPost.ImageUrl)).to.eq(true);
          })
          .should('be.visible');

        /* ----------------------------------------- */
        cy.log('post should have author');
        getUserById(firstPost.UserId).then(user => {
          getPostByTitle(firstPost.Title)
            .find('[data-cy=post-author]')
            .contains(user.FirstName)
            .should('be.visible');
        });

        /* ----------------------------------------- */
        cy.log('post should have publication date');
        getPostByTitle(firstPost.Title)
          .find('[data-cy=post-publication-date]')
          .should('be.visible');

        /* ----------------------------------------- */
        cy.log('post should have description');
        getPostByTitle(firstPost.Title)
          .find('.article__description')
          .should('be.visible');

        /* ----------------------------------------- */
        cy.log('post should `read more` button');
        getPostByTitle(firstPost.Title)
          .find('.article__more-button')
          .should('be.visible');
      });
    });

    it('Post title is a link to post page', () => {
      cy.visit('/');

      getPosts().then(response => {
        const firstPost = response.body[0];

        getPostByTitle(firstPost.Title)
          .find('.article__title').first().children()
          .click();

        cy.location().then(({ pathname }) => {
          expect(pathname).to.eq(`/post/${firstPost.id}`);
        });
      });
    });

    it('author is a link to author profile page', () => {});
  });
});
