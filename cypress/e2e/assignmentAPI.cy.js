describe('Advanced API Test: Posts Endpoint Validation', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');

  const validatePostSchema = (post) => {
    expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
    expect(post.userId).to.be.a('number').and.to.be.gt(0);
    expect(post.id).to.be.a('number').and.to.be.gt(0);
    expect(post.title).to.be.a('string').and.to.have.length.greaterThan(0);
    expect(post.body).to.be.a('string').and.to.have.length.greaterThan(0);
  };

  it('Fetches all posts and validates schema and specific data', () => {
    cy.request(`${apiBaseUrl}/posts`).then((response) => {
      // Validate response metadata
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');

      const posts = response.body;

      // Validate response body structure
      expect(posts).to.be.an('array').and.to.have.length(100);

      // Validate schema of a subset of posts
      posts.slice(0, 5).forEach((post, index) => {
        cy.log(`Validating schema for post #${index + 1}`);
        validatePostSchema(post);
      });

      // Validate filtering: posts by userId = 1
      const user1Posts = posts.filter(post => post.userId === 1);
      expect(user1Posts.length).to.be.greaterThan(0);
      user1Posts.forEach(post => expect(post.userId).to.eq(1));

      // Validate specific post content
      const targetPost = posts.find(post => post.id === 10);
      expect(targetPost).to.exist;
      expect(targetPost.title.toLowerCase()).to.include('optio');
    });
  });
});

describe('User Data and Related Posts/Comments Validation via JSONPlaceholder API', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');

  it('Stores userId from post #1 into environment variable', () => {
    cy.request(`${apiBaseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      const userId = response.body.userId;
      Cypress.env('storedUserId', userId);
      cy.log(`Stored userId from post #1: ${userId}`);
    });
  });

  it('Fetches random user data, their posts, and related comments', () => {
    const randomUserId = Math.floor(Math.random() * 10) + 1;

    cy.request(`${apiBaseUrl}/users/${randomUserId}`).then((userResponse) => {
      expect(userResponse.status).to.eq(200);
      const user = userResponse.body;

      const formattedAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
      cy.log(`Name: ${user.name}`);
      cy.log(`Email: ${user.email}`);
      cy.log(`Address: ${formattedAddress}`);

      console.log(`\n--- User Info (ID: ${randomUserId}) ---`);
      console.log(`Name   : ${user.name}`);
      console.log(`Email  : ${user.email}`);
      console.log(`Address: ${formattedAddress}`);

      // Fetch user posts
      cy.request(`${apiBaseUrl}/posts?userId=${randomUserId}`).then((postsResponse) => {
        expect(postsResponse.status).to.eq(200);
        const posts = postsResponse.body;

        console.log(`\nUser ${randomUserId} has ${posts.length} post(s).\n`);

        // Fetch comments for each post
        posts.forEach((post) => {
          cy.request(`${apiBaseUrl}/posts/${post.id}/comments`).then((commentsResponse) => {
            expect(commentsResponse.status).to.eq(200);
            const comments = commentsResponse.body;

            console.log(`Post ID: ${post.id}`);
            console.log(`Title  : ${post.title}`);
            console.log(`Comments (${comments.length}):`);
            comments.slice(0, 2).forEach((comment, index) => {
              console.log(`  ${index + 1}. ${comment.name} (${comment.email})`);
            });
            console.log('---');
          });
        });
      });
    });
  });
});
