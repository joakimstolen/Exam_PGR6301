import AuctionItemBid from "../../src/client/auctionItemBid";

const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
const {AuctionItem} = require('../../src/client/auctionItem');

test('Test can render auction item form', () => {
    const driver = mount(
        <MemoryRouter>
            <AuctionItem/>
        </MemoryRouter>
    );

    const forms = driver.find('#itemName');
    expect(forms.length).toEqual(1);

    const btns = driver.find('#itemDescription');
    expect(btns.length).toEqual(1);
});