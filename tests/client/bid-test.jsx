//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/match-test.jsx

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

