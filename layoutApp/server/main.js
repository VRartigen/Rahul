import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    fbAddEmail: function() {
      var user = Meteor.user();
      if (user.hasOwnProperty('services') && user.services.hasOwnProperty('facebook')  ) {
        var fb = user.services.facebook;
        var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + fb.id + '?access_token=' + fb.accessToken + '&fields=name,email');

        if (!result.error) {
          Meteor.users.update({_id: user._id}, {
            $addToSet: { "emails": {
              'address': result.data.email,
              'verified': false
            }}
          });
        }
      }
    }
  });
  
});
