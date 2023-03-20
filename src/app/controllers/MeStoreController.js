const { query } = require("express");
const { mutipleMoongoose } = require("../../until/mongoose");
const Course = require("../models/Course");

class MeController {
  //[GET] me/store/courses

  store(req, res, next) {
    let courseQuery = Course.find({deleted: false})
    if(req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: [req.query.type]
      })  
    }  
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render("me/store", {
          deletedCount,
          courses: mutipleMoongoose(courses),
        })
      })
      .catch(next)

  }
  //[GET]/me/trash/courses
  trash(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash", { courses: mutipleMoongoose(courses) })
      )
      .catch(next);
  }
}

module.exports = new MeController();
