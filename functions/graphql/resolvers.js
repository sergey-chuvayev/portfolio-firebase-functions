const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const projectsRef = admin.database().ref('projects');

module.exports = {
  Query: {
    projects() {
      return projectsRef.once('value')
        .then(snapshot => {
          const projects = snapshot.val();
          if (projects === null) return [];
          return Object.keys(projects).map(o => Object.assign({ id: o }, projects[o]));
        });
    },
  }
};