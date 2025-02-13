//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/db/users.js


const users = new Map();
let userId = 0;

function getUser(id){

    return users.get(id);
}


function verifyUser(id, password){

    const user = getUser(id);

    if(!user){
        return false;
    }

    return user.password === password;
}

function createUser(id, password){

    if(getUser(id)){
        return false;
    }

    const user = {
        id: id,
        password: password,
        userId: userId
    };
    userId++;

    users.set(id, user);
    return true;
}



function resetAllUsers(){
    users.clear();
}



module.exports = {getUser, verifyUser, createUser, resetAllUsers};