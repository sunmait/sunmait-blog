import { getPosts } from '../../testHelpers/postHelper';
import { getUserById } from '../../testHelpers/userHelper';
import { searchPostsWithLongestName } from '../../testHelpers/postsSearchHelper';

describe('Posts', () => {
  const testAmountOfPosts = (amount) => {
    cy
      .get('.posts-list__container')
      .find('.article__container').should('have.length', amount);
  };

  describe('Search bar', () => {
    it('search bar should be on a page', () => {
      cy.visit('/');

      cy.get('form input[name=searchQuery]').should('be.visible');
    });

    it('should filter posts by name', () => {
      cy.visit('/');

      getPosts()
        .then(response => {
          const posts = response.body;
          searchPostsWithLongestName(posts);
        });
    });
  });

  describe('Post list', () => {
    it('There are all posts shown', () => {
      cy.visit('/');

      getPosts()
        .then(response => {
          const posts = response.body;
          testAmountOfPosts(posts.length);
        });
    });
  });

  describe('Post info', () => {
    const getPostByTitle = (title) =>
      cy.get('.article__title')
        .contains(title)
        .parents('.article__container');

    it('Post info', () => {
      cy.visit('/');

      getPosts()
        .then(response => {
          const firstPost = response.body[0];

          /* ----------------------------------------- */
          cy.log('post should have image');
          getPostByTitle(firstPost.Title)
            .find('.article__main-post-image')
            .then((a) => {
              expect(
                a[0].style.backgroundImage.includes(firstPost.ImageUrl)
              ).to.eq(true);
            })
            .should('be.visible');

          /* ----------------------------------------- */
          cy.log('post should have author');
          getUserById(firstPost.UserId)
            .then((user) => {

              getPostByTitle(firstPost.Title)
                .find('[data-cy=post-author]').contains(user.FirstName)
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

    it('Post is a link to post page', () => {
      cy.visit('/');

      getPosts()
        .then(response => {
          const firstPost = response.body[0];

          getPostByTitle(firstPost.Title).click();

          cy.location().then(({ pathname }) => {
            expect(pathname).to.eq(`/post/${firstPost.id}`);
          });
        });
    });

    it('author is a link to author profile page', () => {

    });
  });
});
