const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/test");
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: '+ err);
  process.exit(-1); // eslint-disable-line no-process-exit
});


var submissionSchema = mongoose.Schema({
    name: String
});


var clientSchema = mongoose.Schema({
    name: String,
    submission_ids : [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}]
});



var Client = mongoose.model('Client', clientSchema);


submissionSchema.pre('remove', function(next) {
    Client.update(
        { submission_ids : this._id}, 
        { $pull: { submission_ids: this._id } },
        { multi: true })
    .exec();
    next();
});

var Submission = mongoose.model('Submission', submissionSchema);