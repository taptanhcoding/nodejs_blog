class NewController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /news/:detail
    detail(req, res) {
        res.send('news detail');
    }
}

module.exports = new NewController();
