const handleSearch = (wordList) => {
	var curInput = document.getElementById('search').value;
	curInput = curInput.toLowerCase();
	var foundWords = [];
	wordList.forEach((curWord) => {
		var term = curWord.term.toLowerCase();
		if (term.includes(curInput)) {
			foundWords.push(curWord);
		}
	});
	console.log(foundWords);
	return foundWords;
}

export default handleSearch;