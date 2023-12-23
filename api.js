const express = require('express');
const app = express();
const port = 3000;

// User's Details
const Userinfo = [{ id: 1, name: "Danish", age: 24, City: "Nashik" },
{ id: 2, name: "Rohit", age: 22, City: "Mumbai" },
{ id: 3, name: "Rahul", age: 20, City: "Pune" },]

// function to get user details
app.get('/users/:id', (req, res) => {
    let id = Number(req.params.id);
    var UserData = Userinfo.find(userData => userData.id === id);
    res.send(UserData);
});

// function to get all user details
app.get('/users', (req, res) => {
    res.send(Userinfo);
});

app.get('/', (req, res) => {
    res.send(Userinfo);
});


app.post('/users', (req, res) => {
    const user = {
        id: 1, 
        name: req.query.name,
        age: req.query.age,
        City: req.query.City
    };

    if (Userinfo.length > 0) {
        user.id = Userinfo[Userinfo.length - 1].id + 1;
    }
    Userinfo.push(user);
    res.send(user);
});

// function to update user
app.put('/user/:id', (req, res) => {
    let id = Number(req.params.id);
    let Index = Userinfo.findIndex(userData => userData.id === id);

    if (Index >= 0) {
       
        if (req.query.name) {
            Userinfo[Index].name = req.query.name;
        }
        if (req.query.age) {
            Userinfo[Index].age = req.query.age;
        }
        if (req.query.City) {
            Userinfo[Index].City = req.query.City;
        }

        res.send(Userinfo[Index]);
    } else {
        res.send("User not found");
    }
});

// function to delete user
app.delete('/users/:id', (req, res) => {
    let id = Number(req.params.id);
    let index = Userinfo.findIndex(userData => userData.id === id);
    Userinfo.splice(index);
    res.send("User deleted successfully");
});


app.listen(port, () => { console.log("Server is starting.....") })