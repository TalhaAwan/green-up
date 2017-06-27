function checkTest(textEleId, problemStatement){

  console.log(document.getElementById(textEleId).value);
  console.log(problemStatement);
  var l = new Levenshtein(document.getElementById(textEleId).value, problemStatement);
  console.log(l.distance)
}

