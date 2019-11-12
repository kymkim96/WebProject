exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        alert('로그인 필요');
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
    if(req.body.adminCode == '0922')
        next();
    else {
        alert('잘못된 접근입니다!!');
    }
}