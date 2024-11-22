// only these url are allowed to access our api, otherwise our api is open to the public
const allowedOrigins = [
    'http://localhost:3000',
    'https://zwj-info-tracker-7dd3faed13bd.herokuapp.com/',
    // 'https://www.lmcfilms.lmc.gatech.edu/',
    // 'https://lmcfilms.lmc.gatech.edu/'
    // add domain name here.
]

module.exports = allowedOrigins