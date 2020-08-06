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


