class UserViews {
    static viewLogin ({req, res, message}) {
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify(message));
        res.end();
    };

    static viewCreateUser({req, res, message}) {
        console.log('in ViewCreateUser');
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify(message));
        res.end();
    };
};

module.exports = {
    UserViews
};