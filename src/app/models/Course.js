const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete');


const CourseSchema = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String},
    videoID: { type: String, required: true},
    image: { type: String},
    slug: { type: String, slug: "name", unique: true}
}, {
    timestamps: true
});

//add plugin 
mongoose.plugin(slug)
mongoose.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods: 'all' })

module.exports = mongoose.model('Course', CourseSchema);
