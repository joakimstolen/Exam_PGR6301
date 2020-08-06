const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Items} = require('../../src/client/items');
const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const db = require('../../src/server/db/items');
const {app} = require('../../src/server/app');


let server;
let port;

beforeAll(done => {

    server = app.listen(0, () => {
        port = server.address().port;
        done();
    });
});

afterAll(() => {
    server.close();
});

test("Test display items using SuperTest", async () => {

    db.initWithItems();
    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/items"]}>
            <Items/>
        </MemoryRouter>
    );

    const predicate = () => {

        driver.update();
        const tableSearch = driver.find('.completeItemsList');
        const tableIsDisplayed =  (tableSearch.length >= 1);
        return tableIsDisplayed;
    };

    const displayedTable = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedTable).toBe(true);

    const items = db.getAllItems();
    const html = driver.html();

    for(let i=0; i<items.length; i++){
        expect(html).toMatch(items[i].name);
    }
});





test("Test display 1 item using stub", async () => {

    const name = "Iphone 11";

    stubFetch(
        200,
        [{id:0, name: name, description: "The brand new Iphone 11", startingPrice: 5000}],
        (url) => url.endsWith("/api/items")
    );


    const driver = mount(
        <MemoryRouter initialEntries={["/items"]}>
            <Items/>
        </MemoryRouter>
    );

    await flushPromises();

    const html = driver.html();


    expect(html).toMatch(name);
});

test("Test delete items using SuperTest", async () => {

    db.initWithItems();
    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/items"]}>
            <Items/>
        </MemoryRouter>
    );

    const predicate = () => {

        driver.update();
        const tableSearch = driver.find('.completeItemsList');
        const tableIsDisplayed =  (tableSearch.length >= 1);
        return tableIsDisplayed;
    };

    const displayedTable = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedTable).toBe(true);

    const items = db.getAllItems();
    const html = driver.html();

    for(let i=0; i<items.length; i++){
        expect(html).toMatch(items[i].name);
    }
});