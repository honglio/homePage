$(function() {
    FastClick.attach(document.body);

    $(".read-more-trigger").click(function(event) {
        $this = $(this);
        $checkbox = $this.siblings(".read-more-state");
        $checkbox.prop("checked", !$checkbox.prop("checked"));
    });

    // image zooming
    var customZooming = new Zooming({
        enableGrab: false,
        preloadImage: true,
        customSize: { width: 400, height: 300 }
    })
    customZooming.listen('.review .images img');

    // pagination setting - http://flaviusmatis.github.io/simplePagination.js
    $("#pagination").pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });


    // add review stars
    $(".review .stars").each(function (idx, ele) {
        var rate = $(ele).data("rate");
        $(ele).rateYo({
            starWidth: "20px",
            normalFill: "#bbb",
            ratedFill: "#26c6da",
            rating: rate,
            readOnly: true
        });
    });

    // text eclipse effect
    $(".review .content").each(function(idx, ele) {
        var text = $(ele).text();
        if (text.length > 180) {
            $(ele).html('<input type="checkbox" class="read-more-state" />' + 
                         '<p class="read-more-wrap">' + text.substr(0, 180) +
                         '<span class="read-more-target">' + text.substr(180) +
                         '</span></p><label class="read-more-trigger text-info"></label>')
        }
    });

    // read more effect
    $(".read-more-trigger").click(function(event) {
        $this = $(this);
        $checkbox = $this.siblings(".read-more-state");
        $checkbox.prop("checked", !$checkbox.prop("checked"));
    });

    $(".progress").each(function (idx) {
        $this = $(this);
        console.log($this.data('starnumber'));
        var color = '';
        switch (idx) {
            case 0: color = '#177a21'; break;
            case 1: color = '#369e34'; break;
            case 2: color = '#8bc34a'; break;
            case 3: color = '#a5d95d'; break;
            case 4: color = '#bee670'; break;
        }
        move($this.find('.bar'), $this.data('starnumber'), $this.data('total') , color);
    })

    // moving progress bar
    function move(selector, val, total, color) {
        console.log(val);
        console.log(total)
      var elem = selector;
      elem.css('background-color', color);
      elem.find(".number").text(val);
      var widthStop = Math.floor(val / total * 100);
      console.log(widthStop)
      var width = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= widthStop) {
          clearInterval(id);
        } else {
          width++; 
          elem.width(width + '%');
        }
      }
    }

});