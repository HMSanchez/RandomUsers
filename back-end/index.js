var express = require('express');
var app = express();
var gen = require('random-seed');
var names = require('./names.json');
var path = require('path');
var rand = require('random-seed').create();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use("/public", express.static(path.join(__dirname, 'public')));

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var o = {}
var key = 'results';
o[key] = [];


var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
function generate() {
    var randomLetter = "";
    for (i = 0; i < 10; i++) {
        randomLetter += arr[Math.floor(arr.length * Math.random())];

    }
    return randomLetter;
}

function postCode() {
    var arr = [];
    var final = '';
    for (var i = 0; i < 5; i++) {
        if (i > 0) {
            arr.push(getRandomIntInclusive(1, 9));
        } else {
            arr.push(getRandomIntInclusive(2, 9));
        }
    }
    for (var i = 0; i < arr.length; i++) {
        final += arr[i]
    }
    return final;
}

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function createPerson() {
    var data;
    var gen = getRandomIntInclusive(1, 2);
    var number = 0;
    var digits = '';
    for (i = 0; i < 3; i++) {
        number = Math.floor(Math.random() * 10);
        digits = digits + number.toString();
    }
    var gend;
    if (gen == 1) {
        var addressName;
        var fname = names.male_names[getRandomIntInclusive(0, names.male_names.length - 1)];
        var lname = names.last_names[getRandomIntInclusive(0, names.last_names.length - 1)];
        var addressNums = [];
        var birthYear = randomDate(new Date(1980, 0, 1), new Date(2002, 0, 1));
        var year = birthYear.split('-');
        for (var i = 0; i < 3; i++) {
            addressNums.push(getRandomIntInclusive(1, 9));
        }
        addressName = addressNums[0] + "" + addressNums[1] + "" + addressNums[2];
        var imgSize = getRandomIntInclusive(1, 40);
        var medImgString = "";
        var largeImgString = "";
        if (imgSize < 10) {
            medImgString = "http://localhost:3000/public/images/medMen/m" + 0 + "" + 0 + "" + imgSize + ".jpg";
            largeImgString = "http://localhost:3000/public/images/men/m" + 0 + "" + 0 + "" + imgSize + ".jpg";
        } else {
            medImgString = "http://localhost:3000/public/images/medMen/m" + 0 + "" + imgSize + ".jpg";
            largeImgString = "http://localhost:3000/public/images/men/m" + 0 + "" + imgSize + ".jpg";
        }
        data = ({

            gender: "male",
            name: {
                title: "mister",
                first: fname,
                last: lname
            },
            location: {
                street: addressName + " " + names.last_names[getRandomIntInclusive(0, names.last_names.length - 1)] + " " +
                    names.street_types[getRandomIntInclusive(0, names.street_types.length - 1)],
                city: names.last_names[getRandomIntInclusive(0, names.last_names.length - 1)] + "" + names.city_endings[getRandomIntInclusive(0, names.city_endings.length - 1)],
                state: names.states[getRandomIntInclusive(0, names.states.length - 1)],
                postcode: parseInt(postCode())
            },
            email: fname + '.' + lname + "@something.com",
            login: {
                username: names.username_a[getRandomIntInclusive(0, names.username_a.length - 1)] + names.username_b[getRandomIntInclusive(0, names.username_b.length - 1)] + digits,
                password: generate()
            },
            dob: {
                year: birthYear,
                age: 2018 - year[0]
            },
            phone: Math.floor(100000000 + Math.random() * 900000000),
            cell: Math.floor(100000000 + Math.random() * 900000000),
            picture: {
                large: largeImgString,
                medium: medImgString
            },
            nat: names.nat[getRandomIntInclusive(0, names.nat.length - 1)]

        });
    } else if (gen == 2) {
        var addressName;
        var fname = names.female_names[getRandomIntInclusive(0, names.female_names.length - 1)];
        var lname = names.last_names[getRandomIntInclusive(0, names.last_names.length - 1)];
        var number = 0;
        var digits = '';
        for (i = 0; i < 3; i++) {
            number = Math.floor(Math.random() * 10);
            digits = digits + number.toString();
        }
        var addressNums = [];
        var birthYear = randomDate(new Date(1980, 0, 1), new Date(2002, 0, 1));
        var year = birthYear.split('-');
        for (var i = 0; i < 3; i++) {
            addressNums.push(getRandomIntInclusive(1, 9));
        }
        addressName = addressNums[0] + "" + addressNums[1] + "" + addressNums[2];
        var imgSize = getRandomIntInclusive(1, 40);
        var medImgString = "";
        var largeImgString = "";
        if (imgSize < 10) {
            medImgString = "http://localhost:3000/public/images/medWomen/f" + 0 + "" + 0 + "" + imgSize + ".jpg";
            largeImgString = "http://localhost:3000/public/images/women/f" + 0 + "" + 0 + "" + imgSize + ".jpg";
        } else {
            medImgString = "http://localhost:3000/public/images/medWomen/f" + 0 + "" + imgSize + ".jpg"
            largeImgString = "http://localhost:3000/public/images/women/f" + 0 + "" + imgSize + ".jpg"
        }
        data = ({

            gender: "female",
            name: {
                title: "miss",
                first: fname,
                last: lname
            },

            location: {
                street: addressName + " " + names.last_names[getRandomIntInclusive(0, names.last_names.length - 1)] + " " +
                    names.street_types[getRandomIntInclusive(0, names.street_types.length - 1)],
                city: names.last_names[getRandomIntInclusive(0, names.last_names.length - 1)] + "" + names.city_endings[getRandomIntInclusive(0, names.city_endings.length - 1)],
                state: names.states[getRandomIntInclusive(0, names.states.length - 1)],
                postcode: parseInt(postCode())
            },
            email: fname + '.' + lname + "@something.com",
            login: {
                username: names.username_a[getRandomIntInclusive(0, names.username_a.length - 1)] + names.username_b[getRandomIntInclusive(0, names.username_b.length - 1)] + digits,
                password: generate()
            },
            dob: {
                year: birthYear,
                age: 2018 - year[0]
            },
            phone: Math.floor(100000000 + Math.random() * 900000000),
            cell: Math.floor(100000000 + Math.random() * 900000000),
            picture: {
                large: largeImgString,
                medium: medImgString
            },
            nat: names.nat[getRandomIntInclusive(0, names.nat.length - 1)]

        });
    }


    // var info = ({
    //     info: {
    //         seed: "24a315f31fc4d7be",
    //         results: 1,
    //         page: 1,
    //         version: "1.1"
    //     }
    // });
    // o.push(info);
    o[key].push(data);
}

var temp;

app.get('/results=:numOfPeople&seed=:seed', function (req, res) {
    var seed = req.params.seed;
    var num = gen(seed);
    var myseed = req.params.seed,
        rand1 = require('random-seed').create(myseed);
    var randNum = rand1(100);
    if (o[key].length > 0) {
        temp = temp;
    } else {
        temp = randNum;
    }
    // console.log("num " +num);
    // console.log("gen " +gen());
    // console.log("rand "+ rand1(100));
    console.log("TEMP: " + temp);
    console.log("RAND: " + randNum);
    var numOfPeople = req.params.numOfPeople;
    if (temp == randNum) {
        if (o[key].length == 0 || o[key].length == undefined) {
            if (numOfPeople < 5001) {
                for (var i = 0; i < numOfPeople; i++) {
                    createPerson();
                }
                res.send(JSON.stringify(o));
            }
        } else {
            res.send(JSON.stringify(o));

        }

    } else {
        o[key] = [];
        if (numOfPeople < 5001) {
            for (var i = 0; i < numOfPeople; i++) {
                createPerson();
            }
        }
        res.send(JSON.stringify(o));
        // o[key] = [];
        temp = randNum;
    }

});

app.get('/results=:numOfPeople', function (req, res) {
    var numOfPeople = req.params.numOfPeople;
    if (o[key].length == 0 || o[key].length == undefined) {
        if (numOfPeople < 5001) {
            for (var i = 0; i < numOfPeople; i++) {
                createPerson();
            }
            res.send(JSON.stringify(o));
        }
    } else {
        res.send(JSON.stringify(o));
    }
    o[key] = [];

});






app.listen(3000); 