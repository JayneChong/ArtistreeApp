var mongoose = require('mongoose');

//Project field

var projectField = mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "description..."
  },
  artform:[{
      art_id: {
      type: String,
      required: true
    },
    artname: {
      type: String
    }
  }],

});

var Project = module.exports = mongoose.model('Project', projectField);

// get project
module.exports.getAllProject = function(callback) {
  Project.find(callback);
}

// get duedate
var Assignment = mongoose.model('Assignment', { dueDate: Date });
Assignment.findOne(function (err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback);

  doc.markModified('dueDate');
  doc.save(callback);
})


// add project
module.exports.addProject = function(Project, callback) {
  // add chore to chore list
  Project.create(project, callback);

}

// delete project
module.exports.deleteProject = function(projectId, callback) {
  var activeId = mongoose.Types.ObjectId(projectId);
  Project.find({"_id": activeId}).remove(callback);
}