# README for PG6301

### How to run
1. Open the folder containing the program and run ```yarn install``` in the root folder
2. When ```yarn install``` has finished the dependecies have been installed properly, run ```yarn test``` to run test
3. Run ```yarn dev``` to access the application at localhost:8080


### Notes
This website lets you log in and put your belongings out for auction. You can also bid on other peoples items as well as sell your own items. 


### Functionality
- [x]  A visitor of the page should be able to see all the current items on sale, with starting
      price, and what is the highest bid so far on each of the items.
- [x] Create new items to sell with name, description and starting price
- [x] Welcome message when logged in   
- [X] Bid on other peoples auctions
- [x] User can mark their auction as sold if they are happy with the bid they have recieved. If it is marked sold, it cannot be bidded on
- [x] User can not bid on their own auctions
- [x] User can delete their auction
- [x] Login page
- [x] Signup page
- [x] User cannot bid lower than the starting price or lower than the current highest bid
- Managed to complete R1, R2, R3 and T1, T2, T3, T4


### Shortcomings
- I did not have time to complete websocket implementation(T5) 
- I did not complete R4, R5 and T5
- The exsisting fake/test data can not be marked as sold, but all new items can be marked as sold by the creator

### Test Coverage
All test do run. 
All files:  62.47% Stmts coverage (Grade B)

## Endpoints

#### Items (found in app.js)
- GET /api/items
- GET /api/items/:id
- DELETE /api/items/:id
- POST /api/items
- PUT /api/items/:id
#### User (found in auth-api.js)
- POST /login
- POST /logout
- GET /user



## Checklist
### Requirements for E
- [x] Write a home page with React.
- [x] At least 2 other React pages that can be accessed via React-Router.
- [x] At least one page should have some “state”, whose change should be triggerable from the GUI
- [x] From each page, it should be possible to go back to the homepage without having to use the
“Back” button in the browser.
- [x] T1 (grade E)
- [x] T2 (grade E)

### Requirements for D
- [x] RESTful API handling GET, one POST, using JSON as data transfer format.
- [x] The REST API MUST follow the best practices for API design (e.g., on the naming conventions of
the endpoints).
- [x] The frontend MUST use such API (e.g., using fetch).
- [x] Each endpoint MUST be listed in the “readme.md” file (Listed above)
- [x] T3 (grade D)

### Requirements for C
- [x] Handle authentication/authorization, which MUST be session-based via cookies (as
seen in class).
- [x] In the frontend, provide a page to login. Whether to also provide a signup page
- [x]  A logged-in user should get displayed a welcome message
- [x]  On every single page, once logged-in, there MUST be the option to logout
- [x]  T4 (grade C)

