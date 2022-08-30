const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res,next) {
        let courseQuery = Course.find()
        if(res.locals._sort.enable) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        } 
        console.log(res.locals._sort);
        Promise.all([Course.countDocumentsDeleted(),courseQuery])
                .then(([deleteCount,courses]) => {
                    res.render('me/stored-courses',{deleteCount,  courses : multipleMongooseToObject(courses)})
                })
    }

    // [GET] /me/trash/courses
    trashCourses(req, res,next) {
        Course.findDeleted()
            .then(courses => res.render('me/trash-courses',{courses : multipleMongooseToObject(courses)}))
            .catch(next)
       ;
    }
    
}

module.exports = new MeController()