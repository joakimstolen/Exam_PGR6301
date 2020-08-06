//This file has code from the lecturer and has been changed to fit this assignment

const request = require('supertest');
const {app} = require('../../src/server/app');


let counter = 0;

test("Try to change an item", async () => {

    const response = await request(app)
        .put('/api/items/0');
    expect(response.statusCode).toBe(409);
});

