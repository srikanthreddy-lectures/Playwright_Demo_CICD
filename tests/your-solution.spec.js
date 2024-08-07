const { test, expect } = require('@playwright/test');

const postDescription = 'ABCDS';

test.describe('Blog Post Functionality with Mocked API', () => {

  test.beforeEach(async ({ page }) => {
    console.log("beforeEach")
    await page.goto('/');
    await page.locator('input[name="email"]').fill("bob@bob.com");
    await page.locator('input[name="password"]').fill("12345");
    await page.locator('button:text("LOGIN")').click();
  });
//Test
   test('Check Login', async ({ page }) => {
      await expect(page.getByText("viewed your profile")).toBeVisible();
    
    });
    
  test('should allow a user to add a post and see it in the list', async ({ page }) => {
 
     const mockPost= {
      _id: Math.random().toString(36).substr(2, 9),
      userId: "66a0733e439a47af71109679",
      firstName: "bob",
      lastName: "bob",
      location: "ddd",
      description: postDescription,
      userPicturePath: "",
      likes: {},
      comments: [],
      createdAt: "2024-08-05T17:12:34.662Z",
      updatedAt: "2024-08-05T17:12:34.662Z",
      __v: 0
  } 

    await page.route('**/posts', (route, request) => {
      if (request.method() === 'POST') {
        console.log("Mocking POST response");
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: page.evaluate((mockPost) => {
            const storageContent = JSON.parse(localStorage.getItem('persist:root'));
            const posts = JSON.parse(storageContent.posts);
            posts.push(mockPost);
            storageContent.posts = JSON.stringify(posts);
            localStorage.setItem('persist:root', JSON.stringify(storageContent));
          }, mockPost) ,
        });
      } else {
        //route.continue();
      }
    });

    await page.fill('input[placeholder="What\'s on your mind..."]', postDescription);
    await page.locator('button:text("POST")').click();
    await page.reload()
    await expect( page.locator('text=ABCDS')).toBeVisible();
    
  });

});
