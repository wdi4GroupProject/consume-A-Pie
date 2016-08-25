$( document ).ready(function() {
    var requestBtn = $('#request');
    requestBtn.click(function(){
      var input_text = $('#entered_text').val()
      $.ajax({
        url: "https://community-food2fork.p.mashape.com/search?key=d3ab033003c2e546e131f5b45402e3e9&q="+input_text,
        beforeSend: function(xhr){
          xhr.setRequestHeader("X-Mashape-Key", "TNTawfbGBkmshv6lZc8TeuZlwzYPp1vsGnZjsniNdmKHUGxa9o");
          xhr.setRequestHeader("Accept", "text/plain");
        },
        dataType: 'json',
        success: function(result){
          // result = JSON.parse(result);
          var outputDiv = $('#output');
          for (var i = 0; i < result['recipes'].length; i++) {
            var recipe = result['recipes'][i];
            var html = '<div class="well displayRecipe" data-sourceid='+recipe['recipe_id']+'>' +
                      '<h3>'+recipe['title']+'</h3>'  +
                        '<p>'             +
                          'Source URL: '+ recipe['source_url'] + '<br>'  +
                          'Source ID: '+ recipe['recipe_id'] + '<br>'  +
                          'Image: '+ recipe['source_url'] + '<br>'  +
                        '</p>'            +
                    '</div>';
            outputDiv.append(html);
          }

          $('.displayRecipe').click(function(){
            var sourceid = $(this).data('sourceid');
            $.ajax({
              url: "https://community-food2fork.p.mashape.com/get?key=d3ab033003c2e546e131f5b45402e3e9&rId="+sourceid,
              beforeSend: function(xhr){
                xhr.setRequestHeader("X-Mashape-Key", "TNTawfbGBkmshv6lZc8TeuZlwzYPp1vsGnZjsniNdmKHUGxa9o");
                xhr.setRequestHeader("Accept", "text/plain");
              },
              dataType: 'json',
              success: function(result){
                // result = JSON.parse(result);
                var recipe = result['recipe'];
                console.log(recipe);
                console.log(recipe['title']);
                $('#title').val(recipe['title']);
                $('#source').val(recipe['source_url']);
                $('#source_id').val(recipe['recipe_id']);
                $('#ingredients').val(recipe['ingredients'].toString());
                $('#image_url').val(recipe['image_url']);
                $('#directions').val();
                $('#total_calories').val();
              }
            });
          });

        }
      });

    });
});
