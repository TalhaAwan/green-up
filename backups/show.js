var commentId;
$(document).ready(function(){
  commentId = $("#page-comments .page").last().attr('data-id');
  $('#rtl').change(function() {
    if(this.checked){
      $("#text").css('direction', 'rtl');
      $("#text").addClass('noto-nastaliq');
    }
    else{
      $("#text").css('direction', 'ltr');
      $("#text").removeClass('noto-nastaliq');
    }

  });
})

function loadMoreComments(id) { 
  var query = "/"+id+"/comments?";
  $.get(query + "commentId=" + commentId, function(data, status){
    if(!data){
      $( "#load-more-"+id ).hide();
      triggerCommentInterval(id);
    }
    else{
      commentId = $(data).last().attr('data-id')
      $( "#page-comments").append(data);
      $('[id]').each(function () {
        $('[id="' + this.id + '"]:gt(0)').remove();
      });
      $("#page-comments .page").sort(function (a, b) {
        var contentA = Date.parse( $(a).attr('data-date'));
        var contentB = Date.parse( $(b).attr('data-date'));
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      }).appendTo("#page-comments")
    }

  });

}


function triggerCommentInterval(id){
  setInterval(function(){
    var query = "/"+id+"/comments?";
    $.get(query + "commentId=" + commentId, function(data, status){
      if(data){
        $( "#page-comments" ).append(data);
        $('[id]').each(function () {
          $('[id="' + this.id + '"]:gt(0)').remove();
        });
        $("#page-comments .page").sort(function (a, b) {
          var contentA = Date.parse( $(a).attr('data-date'));
          var contentB = Date.parse( $(b).attr('data-date'));
          return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        }).appendTo("#page-comments")
      }
    });
  }, 30000);

}



function addComment (id){
  var data = {};
  $("#page-comment"+ id).serializeArray().map(function(x){data[x.name] = x.value;}); 
  if(!data.text){
    $("#text").after("<div id='text-validation-error' style='color:#FF5252;'>Please enter comment</div>");
    $( "#text" ).focus(function() {
      $("#text-validation-error").remove();
      $(this).off('focus');
    });
  }
  else{
    data.rtl? data.rtl = JSON.parse(data.rtl): null;
    $('#add-comment-btn').attr('disabled', 'disabled'); 
    $.ajax({
     url: "/"+ id +"/comments",
     data: data,
     type: 'POST',
     success: function(data) {
      $("#page-comments" ).append( data );
      $("#page-comment"+ id + " textarea[name=text]").val('');
      $('#add-comment-btn').removeAttr('disabled'); 
    },

    error: function(error){
      console.log(error)
    }
  });
  }
};





var scoreRemarks = {
  0: "You scored nothing, please try again",
  10: "Poor Try :(",
  20: "Not a good sign",
  30: "Poor by a long shot",
  40: "Need a lot of improvement",
  50: "Half if better than nothing",
  60: "Nice, but not there yet",
  70: "Lots of improvement! Keep it up",
  80: "Awesome, getting close!",
  90: "Great! A few steps away from the ultimate",
  100: "Excellent! You can't get any better than 100%. Great job and keep it up."
}
function checkTest(testId, problemStatement){
  var answerId = 'test'+testId+'answer';
  var statusId = 'test'+testId+'status';
  var answer = document.getElementById(answerId).value;
  var maxLength = answer.length > problemStatement.length? answer.length : problemStatement.length;
  var lev = new Levenshtein(document.getElementById(answerId).value, problemStatement);
  var percentage = Math.round(((maxLength -lev.distance)/maxLength)*100);
  var roundScore = Math.round(percentage / 10) * 10;
    document.getElementById(statusId).innerHTML = "("+percentage+"/100) " + scoreRemarks[roundScore];
}

