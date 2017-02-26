$(function() {
    FastClick.attach(document.body);

    $('.multi-selector.overall button').click(function(event) {
        var $this = $(this);
        var $textDiv = $(".filter-selection .text-primary:eq(0)");
        var $preTextDiv = $(".filter-selection span:eq(1)");
        $this.toggleClass("active");

        if ($this.hasClass("active")) {
            $textDiv.text($this.text() + ", " + $textDiv.text());
            $preTextDiv.text("Filtered by ");
        } else {
            $textDiv.text($textDiv.text().replace($this.text() + ", ", ""));
            if ($textDiv.text() === "") {
                $preTextDiv.text("");
            }
        }
    });

    $('.multi-selector.sort button').click(function(event) {
        var $this = $(this);
        var $textDiv = $(".filter-selection .text-primary:eq(1)");
        var $preTextDiv = $(".filter-selection span:eq(3)");
        $this.toggleClass("active").siblings().removeClass('active');

        if ($this.hasClass("active")) {
            $textDiv.text($this.text());
            $preTextDiv.text(" Sorted ");
        } else {
            $textDiv.text("");
            $preTextDiv.text("");
        }
    });

    $("#newRate").rateYo({
        starWidth: "25px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
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

    $(".review .reply .content").each(function(idx, ele) {
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

    $(".review .vote .btn").click(function(event) {
        $this = $(this);
        if (!$this.data("hasVote")) {
            var $tooltip = $this.next('.tooltip');
            var number = +$tooltip.text();
            $tooltip.text(number += 1);
            $this.data("hasVote", true);
        }
        // When not-useful button is onclick, 
        // if useful btn has clicked, 
        // the number of useful vote should minus one.
        var $otherBtn = $this.siblings('.btn');
        if ($otherBtn.data("hasVote")) {
            $otherBtn.data("hasVote", "");
            var $tooltip = $otherBtn.next('.tooltip');
            var number = +$tooltip.text();
            $tooltip.text(number -= 1);
        }
    });

    $(".btn-reply").click(function(event) {
        $this = $(this);
        $this.find('i').toggleClass('fa-sort-down fa-sort-up');
        $this.parent().next('.replies').toggleClass('active');
    });

    function ajaxLoadScores(dataToSend) {
        var beforeSendHandler = function() {
        };

        var successHandler = function(data) {
            mychart.overall("chart-overall", data.overview, function() {});
            mychart.specific("chart-phone", (data["phone support"].average), function() {});
            mychart.specific("chart-website", (data.website.average), function() {});
            mychart.specific("chart-representative", (data.representative.average), function() {});
            mychart.specific("chart-shipping", (data.shipping.average), function() {});    
            mychart.specific("chart-conflictResolution", (data["conflict resolution"].average), function() {
                $(".specific .title").addClass("animated flash animation-delayed")
            });

            $('.specific').click(function(event) {
                $this = $(this);
                var name = $this.find(".title span:nth-of-type(2)").text();
                appendSubs(data[name.toLowerCase()].detail);
            });

            $("#overall-stars").rateYo({
                starWidth: "30px",
                normalFill: "#bbb",
                ratedFill: "#26c6da",
                rating: data.overall,
                readOnly: true
            })

            $("#overall-stars").next('.score').text(data.overall);

            $('#tagcloud').jQCloud(data.tags, {
              shape: 'rectangular',
              autoResize: true,
              fontSize: {
                from: 0.1,
                to: 0.02
              }
            });
        };

        $.ajax({
            method: "POST",
            context : document.body,
            contentType: "application/json",
            data : JSON.stringify(dataToSend),
            url: "/ajaxCompanyScores",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    setTimeout(function() {
        ajaxLoadScores({'fakeCompany': '1234'})
    }, 500);

    function appendSubs(data) {
        $(".specifics .detail").html('<div class="triangle animated fadeInDown"><div class="shape"></div></div><div class="close-icon"><span><i class="fa fa-close"></i></span><span>close</span></div><div id="chart-detail"></div>');
        mychart.detail("chart-detail", data, function() {});
        $("#chart-detail").addClass("animated fadeInDown")
        if (!$("#chart-detail").visible()) {
            $("html, body").animate({ scrollTop: $("#chart-detail").offset().top - 120}, 1000, 'swing');
        }
        // var bgColor = ['bg-primary', 'bg-danger', 'bg-success', 'bg-warning', 'bg-useful', 'bg-info'];
        // data[0][specific.toLowerCase()].sub.forEach(function(val, i) {
        //     var number = Math.round((+val.value) / 5 * 100);
        //     var html = new EJS({ url: './ejs/progressbar.ejs' }).render({ newNumber: number, newLabel: val.name, color: bgColor[i] });
        //     $(".specifics .detail").append(html);
        // });
    }

    $('.detail').on('click', '.close-icon', function() {
        $('.detail').empty();
    });

    // image zooming
    var customZooming = new Zooming({
        enableGrab: false,
        preloadImage: true,
        customSize: { width: 400, height: 300 }
    })
    customZooming.listen('.review .images img');
});
