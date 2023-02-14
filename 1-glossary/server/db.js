require("dotenv").config();
const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost:27017');
// 2. Set up any schema and models needed by the app
const wordSchema = new mongoose.Schema({
	term: String,
	def: String
});
// 3. Export the models
const Word = mongoose.model('Words', wordSchema);
// 4. Import the models into any modules that need them
var addWord = (word, cb) => {
	const newWord = new Word({term: word.term, def: word.def});
	newWord.save((err) => {
		if (err) {
			cb(err);
		} else {
			console.log(`${JSON.stringify(word)} saved to model`);
			cb(null);
		}
	});
}

var getWords = (cb) => {
	Word.find({}, (err, data) => {
		if (err) {
			cb(err, null);
		} else {
			cb(null, data);
		}
	});
}

var deleteWord = (term, cb) => {
	Word.deleteOne({term} , (err) => {
		if (err) {
			cb(err);
		} else {
			cb(null);
		}
	});
};

var editWord = (term, newDef, cb) => {
	console.log(term, newDef);
	Word.updateOne({term}, {def: newDef}, (err) => {
		if (err) {
			cb(err);
		} else {
			cb(null);
		}
	})
}

module.exports.addWord = addWord;
module.exports.getWords = getWords;
module.exports.deleteWord = deleteWord;
module.exports.editWord = editWord;
