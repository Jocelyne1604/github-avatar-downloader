var request = require('request');
var secret = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + secret.GITHUB_TOKEN
        }
    };

    request(options, function (err, res, body) {
        cb(err, body);
    });
}


getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});



console.log('Welcome to the GitHub Avatar Downloader!');

// curl - i - H 'Authorization: token 84a45c6cee4c46643a71d10dc0f86b5397e5faa4 https://api.github.com/repos/jquery/jquery/contributors
// curl - u Jocelyne1604:84a45c6cee4c46643a71d10dc0f86b5397e5faa4 - I https://api.github.com/users/lighthouse-labs
