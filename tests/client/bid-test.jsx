import Bid from "../../src/client/bid";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');


test("Test can render bid form", () => {
    const driver = mount(
        <MemoryRouter>
            <Bid initialEntries={['/edit']}/>
        </MemoryRouter>
    );

    const hTags = driver.find('#loginMsgBid');
    expect(hTags.length).toEqual(1);
})

