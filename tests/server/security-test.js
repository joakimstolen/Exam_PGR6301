const request = require('supertest');
const {app} = require('../../src/server/app');


let counter = 0;

test("Try to buy loot box without logging in", async () => {

    const response = await request(app)
        .put('/api/items/0');
    expect(response.statusCode).toBe(409);
});

