$(function () {
    $('.knb-question-search').hide();
    $.getJSON( "https://bdthemes.com/wp-json/wp/v2/knowledge_base", function( data ) {
        $('.loading-text').hide();
        let items = [], contentArray = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='item-" + key + "' data-id=" + val.id + " class='article-lists'><div>" + val.title.rendered + "</div></li>" );
            contentArray.push({
                'id' : val.id,
                'content': val.content.rendered
            });
        });
        $(".knb-articles-wrapper ul").html(items);
        $('.knb-question-search').show();
        $( ".article-lists" ).on( "click", function() {
            let contentViewData = contentArray.find(x => x.id === $(this).data('id'));
            if(contentViewData){
                $(".knb-articles-wrapper ul, .knb-question-search, .knb-header").hide();
                $('.knb-content-details').html('<button class="btn btn-warning content-back">back</button>' + contentViewData.content);
                $('.content-back').click(function(){
                    $(".knb-articles-wrapper ul, .knb-question-search, .knb-header").show();
                    $('.knb-content-details').empty();
                });
            }
        });
    });
});