//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/match-test.jsx

import AuctionItemBid from "../../src/client/auctionItemBid";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

test('Test can render auction bid form', () => {
    const driver = mount(
        <MemoryRouter>
            <AuctionItemBid/>
        </MemoryRouter>
    );


    const forms = driver.find('#itemHighestBid');
    expect(forms.length).toEqual(1);

});


