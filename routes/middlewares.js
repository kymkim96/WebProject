exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {

        res.redirect('/');
    }
}

exports.checkAdminPermission = (req, res, next) => {
    if(req.user.admincode === '0922') {
        next();
    }
    else {
        res.send('잘못된 접근입니다!!')
    }
}

exports.adminCode = {
    admincode: '0922',
};