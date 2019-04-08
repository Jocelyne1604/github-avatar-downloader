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

    function cb(data) {
        for (i = 0; i < jSonArr.length; i++) {
            console.log(jSonArr[i].avatar_url);
        }
    }


    request(options, function (err, res, body) {
        // console.log(jSonArr);
        // // for (var result in body) {
        jSonArr = JSON.parse(body);

        cb(err, body);

    });
}



getRepoContributors("jquery", "jquery", request);





// curl - i - H 'Authorization: token 84a45c6cee4c46643a71d10dc0f86b5397e5faa4 https://api.github.com/repos/jquery/jquery/contributors
// curl - u Jocelyne1604:84a45c6cee4c46643a71d10dc0f86b5397e5faa4 - I https://api.github.com/users/lighthouse-labs
