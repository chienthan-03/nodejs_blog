const Course = require("../models/Course");
const { mutipleMoongoose } = require("../../until/mongoose");
const { mongooseToObject } = require("../../until/mongoose");

class CoursesController {
  //[GET]
  index(req, res, next) {
    Course.find({ deleted: false})
      .then((courses) => {
        res.render("courses", {
          courses: mutipleMoongoose(courses),
        });
      })
      .catch(next);
  }

  //[GET]/courses/slug:id
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((courses) =>
        res.render("course/show", {
          courses: mongooseToObject(courses),
        })
      )
      .catch((err) => next(err));
  }

  //[GET]/courses/create
  create(req, res, next) {
    res.render("course/create");
  }
  //[POST]/courses/store
  store(req, res, next) {
    const course = new Course(req.body);
    course.save()
      .then(() => res.redirect("http://localhost:3000/courses"));
  }
  //[GET]/courses/:id/update
  update(req, res, next) {
    Course.findById(req.params.id)
      .then((courses) => {
        res.render("course/update", {
          courses: mongooseToObject(courses),
        });
      })
      .catch(next);
  }
  //[PUT]/courses/:id
  edit(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("http://localhost:3000/courses"))
      .catch(next);
  }
  //[DELETE]/courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH]/courses/:id/retore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);    
  }

  //[DELETE]/courses/:id/distroy
  distroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);    
  }

  //[POST]course/handle-form-action
  handleFormAction(req, res, next) {
    switch(req.body.action) {
      case 'Delete':
        Course.delete({ _id: {$in: req.body.courseIds}})
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' })
    }
  }
}

module.exports = new CoursesController();
