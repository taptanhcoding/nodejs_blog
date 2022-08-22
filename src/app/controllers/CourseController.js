const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
    // [GET] /course/:slug
    show(req, res,next) {
        Course.find({slug : req.params.slug})
        .then(course => {res.render('course/show',{ course: mongooseToObject(course) }) } )
        .catch(next)
       ;
    }
    //[GET] /courrse/create
    create(req, res,next) {
        res.render('course/create')
       
    }
    //[POST] /course/store
    store(req, res,next) {
        const formData = req.body
        formData.image= `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('../'))
            .catch(error => { 
                
            })
    }
}

module.exports = new CourseController()