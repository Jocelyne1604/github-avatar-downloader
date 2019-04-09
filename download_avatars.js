var request = require('request');
var secret = require('./secrets');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];


if (process.argv.length < 4) {
    throw "Repo owner required";
}

// domain name I  want to read from,
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            //goes and get the token from my other secret.js file (token is confidential)
            'Authorization': 'token ' + secret.GITHUB_TOKEN
        }
    };

    request(options, function (err, res, body) {
        jSonArr = JSON.parse(body);
        // [{avatar_url: ...}, {]}]
        cb(err, jSonArr);
    });
}

function downloadImageByURL(url, filePath) {
    //passed in Calback
    request.get(url)
        //2 options, if the link works, load the image and spit out a message, if not, throw error
        .on('error', function (err) {
            throw err;
        })

        .pipe(fs.createWriteStream(filePath))
        .on('finish', function (response) {
            console.log('image saved');
        });
}

//Callback
getRepoContributors("jquery", "jquery", function (err, result) {
    //I want to get every avatar URL here SHOWS THE LIST:
    for (i = 0; i < result.length; i++) {
        var url = result[i].avatar_url;
        var filePath = './avatars' + "/" + result[i].login + '.jpg';
        //pass downloadImageByURL function what  link will the pipe follow to complete callback?
        downloadImageByURL(url, filePath);
    }
});



