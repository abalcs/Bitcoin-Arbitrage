const withAuth = (req, res, next) => {
    console.log(req.session.user_id, 'THIS IS THE USER ID')
    if (!req.session.user_id) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = withAuth;