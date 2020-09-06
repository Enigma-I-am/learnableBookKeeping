const fs = require("fs");
const helper = require("./helpers");

let BOOKS = [];
let USERS = [];

const loadBooks = () => { //load todos from fs
    try {
        const dataBuffer = fs.readFileSync("books.json");
        const stringBuffer = dataBuffer.toString();
        const dataJson = JSON.parse(stringBuffer);
        // console.log(dataJson);
        BOOKS = dataJson;
    } catch (error) {
        return [];
    }
}

const loadUsers = () => { //load todos from fs
    try {
        const dataBuffer = fs.readFileSync("users.json");
        const stringBuffer = dataBuffer.toString();
        const dataJson = JSON.parse(stringBuffer);
        // console.log(dataJson);
        USERS = dataJson;
    } catch (error) {
        return [];
    }
};

loadUsers();
loadBooks();

var lib = {};
// Books
lib.createBook = (payload, callback) => {
    if (payload != null) {
        let booksList = BOOKS;
        const book = payload;
        booksList.push(book);
        let stringJson = JSON.stringify(booksList);
        fs.writeFileSync("books.json", stringJson);
        console.log(booksList);
        callback("book created");
    } else {
        callback("Error creating new book");
    };
};

lib.getAllBooks = (callback) => {
    if (BOOKS != null) {
        const dataBuffer = fs.readFileSync("books.json");
        const stringBuffer = dataBuffer.toString();
        const dataJson = JSON.parse(stringBuffer);
        callback(false, { book: dataJson });
    } else {
        callback("No books", { data: null });
    }

};

lib.getABook = (name, callback) => {
    
    if (name != null) {
        var obj = {};
        TODOS.forEach(element => {
            if (element.name === name) {
                obj = element;
                console.log(element);
            }
        });

    } else {
        callback("Book not found");
    }


};

lib.updateBook = (name, payload, callback) => {

    if (payload != null) {
        let newItems = BOOKS;
        newItems.forEach(element => {
            if (element.name === name) {
                element = payload;
            }
        });
        console.log(newItems);
        let stringNewITem = JSON.stringify(newItems);
        fs.writeFileSync("todos.json", stringNewITem);
        callback("book update", { data: payload });
    } else {
        callback("Error updating book");
    }

};

lib.deleteBook = (name, callback) => {
    if (name != null) {
        let todoItems = BOOKS;
        let filteredTodoItems = todoItems.filter(el => el.name !== name);
        let stringJson = JSON.stringify(filteredTodoItems);
        fs.writeFileSync("books.json", stringJson);
        callback("book deleted", { data: filteredTodoItems });
    } else {
        callback("Error deleting book");
    }

};

// Users
lib.createUser = (payload, callback)=>{
    if (payload != null) {
        let usersList = USERS;
        const user = payload;
        user.uid = helper.generateRandomString();
        usersList.push(user);
        let stringJson = JSON.stringify(usersList);
        fs.writeFileSync("users.json", stringJson);
        console.log(usersList);
        callback("user created");
    } else {
        callback("Error creating new user");
    };
};

lib.getUser = ()=>{};



module.exports = lib;