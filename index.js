const request = require('request');


module.exports = {
    getContactByFirstname: async function(firstname) {
        const requestUrl = `https://jsonplaceholder.typicode.com/users?firstname=${firstname}`;
        return new Promise((resolve, reject) => {
            request.get(requestUrl, (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(body));
            });
        });
    }
}
