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
        //console.log(req.isAuthenticated())
        res.redirect('/');
    }
}

exports.checkAdminPermission = (req, res, next) => {
    if(req.user.admincode === '0922')
        next();
    else {
        res.send('잘못된 접근입니다!!')
    }
}