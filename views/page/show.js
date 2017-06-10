

  var commentId;
  $(document).ready(function(){
    commentId = $("#page-comments .page").last().attr('data-id');
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

  $('#rtl').change(function() {
    $("#text").css('direction',  this.checked? 'rtl' : 'ltr');                
  });
