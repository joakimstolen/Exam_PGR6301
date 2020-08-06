import Create from "../../src/client/create";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');


test("Test can render create form", () => {
    const driver = mount(
        <MemoryRouter>
            <Create initialEntries={['/create']}/>
        </MemoryRouter>
    );

    const hTags = driver.find('#loginMsgCreate');
    expect(hTags.length).toEqual(1);
})

