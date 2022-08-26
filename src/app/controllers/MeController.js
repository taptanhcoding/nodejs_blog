const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res,next) {
        Promise.all([Course.countDocumentsDeleted(),Course.find()])
                .then(([deleteCount,courses]) => {
                    res.render('me/stored-courses',{deleteCount,  courses : multipleMongooseToObject(courses)})
                })

    //     Course.countDocumentsDeleted()
    //         .then(deleteCount => {
    //             console.log(deleteCount);
    //         })
    //         .catch(() => {})

    //     Course.find()
    //         .then(courses => res.render('me/stored-courses',{courses : multipleMongooseToObject(courses)}))
    //         .catch(next)
    //    ;
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