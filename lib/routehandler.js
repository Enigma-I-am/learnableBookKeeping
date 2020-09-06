const fileutil = require("./fileutil");
const helper = require("./helpers");
const routehandler = {};


// Books routes 
routehandler.Books = (data, callback) => {
    const acceptableHeaders = ['post', 'get', 'put', 'delete'];

    if (acceptableHeaders.indexOf(data.method) > -1) {
        routehandler._books[data.method](data, callback);
    } else {
        callback(405);
    }
};

routehandler._books = {};

//Post route -- for creating a book
routehandler._books.post = (data, callback) => {
    //validate that all required fields are filled out
    var name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var price = typeof (data.payload.price) === 'string' && !isNaN(parseInt(data.payload.price)) ? data.payload.price : false;
    var author = typeof (data.payload.author) === 'string' && data.payload.author.trim().length > 0 ? data.payload.author : false;
    var publisher = typeof (data.payload.publisher) === 'string' && data.payload.publisher.trim().length > 0 ? data.payload.publisher : false;

    if (name && price && author && publisher) {

        fileutil.createBook(data.payload, (success) => {
            if (!success) {
                callback(400, { message: "could add not book", data: null });
            } else {
                console.log(success);
                callback(200, { message: "book added successfully" });
            }
        });
    } else {
        callback(403, { message: " incomplete data", data: { name, price, author, publisher } });
    }
};

//Get route -- for geting a book

routehandler._books.get = (data, callback) => {
    if (data.query.name) {

        fileutil.getAllBooks((success, data) => {

            if (!success) {
                console.log(success);
                callback(400, { message: "No books", data: null });
            } else {
                console.log(success);
                callback(success)
            };

        });

    } else {
        callback(404, { message: 'book not found', data: null });
    }

};

//Put route -- for updating a book
routehandler._books.put = (data, callback) => {
    callback(200, { response: "book updated" });
};
//Delete route -- for deleting a book
routehandler._books.delete = (data, callback) => {
    callback(200, { response: "book deleted" });
};




// Users route
routehandler.Users = (data, callback) => {

    const acceptableHeaders = ['post', 'get', 'put', 'delete'];

    if (acceptableHeaders.indexOf(data.method) > -1) {
        routehandler._users[data.method](data, callback);
    } else {
        callback(405);
    }

};

routehandler._users = {};



// User routes
routehandler.User = (data, callback) => {
    const acceptableHeaders = ['post', 'get', 'put', 'delete'];

    if (acceptableHeaders.indexOf(data.method) > -1) {
        routehandler._user[data.method](data, callback);
    } else {
        callback(405);
    }
};
routehandler._user = {

};

//Post route -- for creating a user
routehandler._user.post = (data, callback) => {

    let firstname = typeof (data.payload.firstname) === 'string' && data.payload.firstname.trim().length > 0 ? data.payload.firstname : false;
    let lastname = typeof (data.payload.lastname) === 'string' && data.payload.lastname.trim().length > 0 ? data.payload.lastname : false;
    data.payload.uid = helper.generateRandomString();
    data.payload.role = "user";
    let uid = data.payload.uid;
    let role = data.payload.role;

    if (firstname && uid && role && lastname) {

        fileutil.createUser(data.payload, (success) => {
            if (!success) {
                callback(400, { message: "could not add not user", data: null });
            } else {
                console.log(success);
                callback(200, { message: "user added successfully" });
            }
        });
    } else {
        callback(403, { message: " incomplete data", data: { firstname, lastname, uid, role } });
    }


};
//Get route -- for geting a book
routehandler._user.get = (data, callback) => {
    callback(200, { response: "user gotten" });
};
//Delete route -- for deleting a book
routehandler._user.delete = (data, callback) => {
    callback(200, { response: "user delted" });
};






routehandler.ping = (data, callback) => {
    callback(200, { response: "server is life" });
};

routehandler.notfound = (data, callback) => {
    callback(404, { response: "server not found" });
};

module.exports = routehandler;