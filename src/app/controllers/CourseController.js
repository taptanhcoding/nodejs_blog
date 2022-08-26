const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
    // [GET] /course/:slug
    show(req, res,next) {
        Course.findOne({slug : req.params.slug})
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
        req.body.image= `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => { 
                
            })
    }

    //[GET] /courrse/:id/edit
    edit(req, res,next) {
        Course.findById(req.params.id)
        .then(course => {res.render('course/edit',{ course: mongooseToObject(course) }) } )
        .catch(next)
       ;
    // res.render('course/edit')
    }

     //[PUT] /courrse/:id
    update(req, res,next) {
        Course.updateOne({_id: req.params.id }, req.body)   
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next)
    }

     //[PUT] /courrse/:id/restore
     restore(req, res,next) {
        Course.restore({_id: req.params.id })   
                .then(() => res.redirect('back'))
                .catch(next)
    }

    

    //[DELETE] /course/:id
    delete(req, res,next) {
        Course.delete({_id: req.params.id })   
                .then(() => res.redirect('back'))
                .catch(next)
    }

     //[POST] /course/handle-form-actions
     deleteMulti(req, res,next) {
        const id = req.body
        var ListId = new Array(id.length)
        res.json(id)
        // Course.delete({_id: req.params.id })   
        //         .then(() => res.redirect('back'))
        //         .catch(next)
    }

    //[DELETE] /course/:id/destroy
    destroy(req, res,next) {
        Course.deleteOne({_id: req.params.id })   
                .then(() => res.redirect('back'))
                .catch(next)
    }
    
}

module.exports = new CourseController()