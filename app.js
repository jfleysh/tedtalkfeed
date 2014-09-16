google.load("feeds", "1");

function initialize() {

  var feedContainer = $('#feedContainer'),
    list = '';

  //load ted talk feed using google feed
  var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
  feed.setNumEntries(20); //set initial feed display to 20
  feed.load(function(data) {

    if (!data.error) {
      var feedResults = data.feed.entries; //set up var for feed entries

      //appends dynamic feed per ted talk
      feedResults.forEach(function(result){
          var $article = $('<article/>'),
            $title = $('<div class="title">').text(result.title).appendTo($article),
            $publishedDate = $('<div class="date">').text(result.publishedDate).appendTo($article),
            $link = $('<a>').attr('href', result.mediaGroups[0].contents[0].url).appendTo($article),
            $content = $('<div class="video">').appendTo($link),            
            $contentSnippet = $('<div>').text(result.contentSnippet).appendTo($article),
            $detailsButton = $('<button class="details less">More Details</button>').appendTo($article);

          feedContainer.append($article);

          //button clickhandler
          $detailsButton.on("click", function(){
            moreLess($(this));
          });

          //functionality to display less/more metadata
          function moreLess(btn){
            if (btn.hasClass('more')) {
              $contentSnippet.html('<span>'+result.contentSnippet+'</span>');
              btn.text('More Details').addClass('less').removeClass('more');
            }
            else if (btn.hasClass('less')){
              $contentSnippet.html('<span>'+result.content+'</span><span class="tedlink"><a target="_blank" href="'+result.link+'">Read Full Article</a></span>');
              btn.addClass('more').removeClass('less').text('Less Details')
            }
          }
      });
    }
  });
};
google.setOnLoadCallback(initialize);


