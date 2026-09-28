import { expect, test } from "@playwright/test";

const apiBase = process.env.API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

test("GET /posts/1 returns a post", async ({ request }) => {
  const response = await request.get(`${apiBase}/posts/1`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toEqual(
    expect.objectContaining({
      userId: expect.any(Number),
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    }),
  );
});
