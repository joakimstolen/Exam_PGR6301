//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/client/home-test.jsx


const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');


const {Home} = require('../../src/client/home');


const needToLogInMsg = "Log in/sign up to get premium access";

test("Test not logged in", async () => {

    const driver = mount(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(needToLogInMsg)).toEqual(true);
});


test("Test logged in", async () => {

    const user = {id: "Foo", password:"bar"};
    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} user={user}/>
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(needToLogInMsg)).toEqual(false);

});