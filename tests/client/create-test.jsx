//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/match-test.jsx

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

