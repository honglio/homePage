$(function() {
    FastClick.attach(document.body);
    // Smoth page scroll
    // $('a[href*=#]:not([href=#])').click(function(event) {
    //     if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
    //         var target = $(this.hash);
    //         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //         if (target.length) {
    //             $('body').animate({
    //                 scrollTop: target.offset().top - 45
    //             }, 1000, function() {
    //                 console.log($(event.target).parent());
    //                 $(event.target).parent().trigger('click.hideDropdownMenu');
    //             });
    //             return false;
    //         }
    //     }
    // });

    $('.multi-selector.home button').click(function(event) {
        var $this = $(this);
        $this.addClass("active").siblings().removeClass('active');
        if ($this.parent().parent().hasClass('active')) {
            $this.parent().parent().removeClass('active');
            setTimeout(function() {
                $this.parent().parent().addClass('active');
            }, 200);
        } else {
            $this.parent().parent().addClass('active');
        }

        $('#company .container').removeClass('animated fadeInDown');
        setTimeout(function() {
            $('#company .container').addClass('animated fadeInDown');
        }, 200);
    });

    $("#company-1").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 3.5,
        readOnly: true
    });

    $("#company-2").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 1.2,
        readOnly: true
    });

    $("#company-3").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 4.2,
        readOnly: true
    });

    $("#company-4").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 2.2,
        readOnly: true
    });

    $("#company-5").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 3.5,
        readOnly: true
    });

    $("#company-6").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 3.2,
        readOnly: true
    });

    $("#review-1").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 3.2,
        readOnly: true
    });
    $("#review-2").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 2.0,
        readOnly: true
    });
    $("#review-3").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 1.7,
        readOnly: true
    });
    $("#review-4").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 4.0,
        readOnly: true
    });
    $("#review-5").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 1.7,
        readOnly: true
    });
    $("#review-6").rateYo({
        starWidth: "20px",
        normalFill: "#bbb",
        ratedFill: "#26c6da",
        rating: 4.0,
        readOnly: true
    });

    equalHeight();
    window.onresize = equalHeight;
    window.onscroll = function(e) {
        // called when the window is scrolled.  
        if ($("#company > .wrapper > h2").visible()) {
            $("#company > .wrapper > h2").removeClass('opacity-none');
            $("#company > .wrapper > h2").addClass('animated fadeInDown');
        }

        if ($("#company .container > .row > .col-6").visible(true)) {
            $("#company .container > .row > .col-6").removeClass('opacity-none');
            $("#company .container > .row > .col-6").addClass('animated fadeInDown');
        }

        if ($("#review .container > .row").visible(true)) {
            $("#review .container > .row").each(function (idx, ele) {
                if($(ele).hasClass('opacity-none')) {
                    $(ele).removeClass('opacity-none');
                    $(ele).addClass('animated fadeInDown');
                }
            });
        }

        if ($("#blog .container > .row").visible(true)) {
            $("#blog .container > .row").removeClass('opacity-none');
            $("#blog .container > .row").addClass('animated fadeInDown');
        }

        if ($("#contact .engage > h2").visible()) {
            $("#contact .engage > h2").removeClass('opacity-none');
            $("#contact .engage > h2").addClass('animated fadeInDown');
        }
    }


    $('#loadmore').click(function() {
        ajaxAppendMoreReviews();
    });

    function ajaxAppendMoreReviews(dataToSend) {
        var beforeSendHandler = function() {
            $("#review > .wrapper > .container").append("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            // data structure convertion only required in real Ajax
            // var newReviews = [];
            // data.forEach(function (val, idx) {
            //     newReviews.push({
            //         companyName : val.companyName,
            //         date: val.momented,
            //         text: val.reviewText,
            //         useful: val.usefulnessResults.useful,
            //         unuseful: val.usefulnessResults.useless,
            //         reps: val.anonId ? val.anonId.repPoints : val.userId.repPoints,
            //         username : val.anonId ? val.anonId.shortId : val.userId.username,
            //         img: './img/android-contact.png'
            //     })
            // });
            var newReviews = [{
                profileImg: 'img/profile/man.png',
                username: 'User Name',
                date: 'Juanuary 7 2017',
                repPoints: '2762',
                time: '11:20 A.M.',
                rate: 4.1,
                companyName: 'Huawei',
                title: 'Excellent company',
                serialNum: 'review-' + Math.floor(Math.random() * 90 + 10),
                content: 'Whether it’s overall happiness in a country, the unemployment rate, or the participation rate in the latest polls or e-votes, you can view everything on a powerful, customizable dashboard. Whether it’s overall happiness in a country, the unemployment rate, or the participation rate in the latest polls or e-votes, you can view everything on a powerful, customizable dashboard. Whether it’s overall happiness in a country, the unemployment rate, or the participation rate in the latest polls or e-votes, you can view everything on a powerful, customizable dashboard.',
                useful: '201',
                notuseful: '76'
            }, {
                profileImg: 'img/profile/girl-green.png',
                username: 'User Name',
                date: 'Juanuary 7 2017',
                repPoints: '1212',
                time: '17:10 P.M.',
                rate: 2.9,
                companyName: 'Microsoft',
                title: 'This is a quite long review title for testing how this div will look in different screen width.',
                serialNum: 'review-' + Math.floor(Math.random() * 90 + 10),
                content: 'Whether it’s overall happiness in a country, the unemployment rate, or the participation rate in the latest polls or e-votes, you can view everything on a powerful, customizable dashboard.',
                useful: '201',
                notuseful: '76'
            }, {
                profileImg: 'img/profile/girl-flowers.png',
                username: 'User name',
                date: 'Juanuary 2 2017',
                repPoints: '812',
                time: '21:30 P.M.',
                rate: 1.6,
                companyName: 'Nokia',
                title: 'Bad company',
                serialNum: 'review-' + Math.floor(Math.random() * 90 + 10),
                content: 'Whether it’s overall happiness in a country, the unemployment rate, or the participation rate in the latest polls or e-votes, you can view everything on a powerful, customizable dashboard.',
                useful: '122',
                notuseful: '321'
            }, {
                profileImg: 'img/profile/girl-fur.png',
                username: 'Test user name',
                date: 'February 28 2019',
                repPoints: '1232',
                time: '19:51 P.M.',
                rate: 4.3,
                companyName: 'JD',
                title: 'This is a long review title for testing',
                serialNum: 'review-' + Math.floor(Math.random() * 90 + 10),
                content: 'It felt like a mid range three star eCommerce compared with this one. The search bar was a great set up for my business. Any help I needed relating to.',
                useful: '1232',
                notuseful: '321'
            }, {
                profileImg: 'img/profile/woman.png',
                username: 'Test user name',
                date: 'February 2 2017',
                repPoints: '2012',
                time: '09:30 P.M.',
                rate: 2.1,
                companyName: 'Amazon',
                title: 'Still the best eCommerce',
                serialNum: 'review-' + Math.floor(Math.random() * 90 + 10),
                content: 'It felt like a mid range three star eCommerce compared with this one. The search bar was a great set up for my business. Any help I needed relating to.',
                useful: '1232',
                notuseful: '321'
            }, {
                profileImg: 'img/profile/woman-hide.png',
                username: 'Tester',
                date: 'February 8 2017',
                repPoints: '784',
                time: '03:40 P.M.',
                rate: 3.5,
                companyName: 'Ebay',
                title: 'Exceptional',
                serialNum: 'review-' + Math.floor(Math.random() * 90 + 10),
                content: 'Everything works perfectly and takes eCommerce to the next level in quality.',
                useful: '743',
                notuseful: '21'
            }];
            $('#loadingImg').remove(); // remove spinner
            var html = new EJS({ url: './ejs/moreReviews.ejs' }).render({ newReviews: newReviews });
            $("#review > .wrapper > .container").append(html);

            newReviews.forEach(function(val) {

                $("#" + val.serialNum).rateYo({
                    starWidth: "20px",
                    normalFill: "#bbb",
                    ratedFill: "#26c6da",
                    rating: val.rate,
                    readOnly: true
                });
            })

            // need to put on the end of this function.
            equalHeight();

        };

        // Fake ajax load
        beforeSendHandler();
        setTimeout(function() {
            successHandler();
        }, 1200)

        // Uncomment this for real AJAX load
        // $.ajax({
        //     method: "POST",
        //     context : document.body,
        //     contentType: "application/json",
        //     data : JSON.stringify(dataToSend),
        //     url: "/ajaxHeader/",
        //     beforeSend: beforeSendHandler,
        //     success: successHandler
        // });
    }

    $('#company .selector button').click(function() {
        ajaxLoadNewCompanys();
    });

    function ajaxLoadNewCompanys(dataToSend) {
        var beforeSendHandler = function() {
            $("#company > .wrapper > .container > .row").html("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            // data structure convertion only required in real Ajax
            // var newReviews = [];
            // data.forEach(function (val, idx) {
            //     newReviews.push({
            //         companyName : val.companyName,
            //         date: val.momented,
            //         text: val.reviewText,
            //         useful: val.usefulnessResults.useful,
            //         unuseful: val.usefulnessResults.useless,
            //         reps: val.anonId ? val.anonId.repPoints : val.userId.repPoints,
            //         username : val.anonId ? val.anonId.shortId : val.userId.username,
            //         img: './img/android-contact.png'
            //     })
            // });
            var newCompanys = [{
                screenshot: 'img/sample/Desert.jpg',
                companyName: 'Amazon 1',
                rate: 2.1,
                serialNum: 'company-1',
                reviewsNum: 362,
                specifics: [{
                    name: 'phone support',
                    average: 42
                }, {
                    name: 'website',
                    average: 55
                }, {
                    name: 'representative',
                    average: 87
                }, {
                    name: 'shipping',
                    average: 76
                }, {
                    name: 'conflict resolution',
                    average: 87
                }]
            }, {
                screenshot: 'img/sample/Hydrangeas.jpg',
                companyName: 'Amazon 2',
                rate: 3.4,
                serialNum: 'company-2',
                reviewsNum: 3892,
                specifics: [{
                    name: 'phone support',
                    average: 88
                }, {
                    name: 'website',
                    average: 52
                }, {
                    name: 'representative',
                    average: 91
                }, {
                    name: 'shipping',
                    average: 12
                }, {
                    name: 'conflict resolution',
                    average: 32
                }]
            }, {
                screenshot: 'img/sample/Jellyfish.jpg',
                companyName: 'Amazon 3',
                rate: 4.2,
                serialNum: 'company-3',
                reviewsNum: 731,
                specifics: [{
                    name: 'phone support',
                    average: 46
                }, {
                    name: 'website',
                    average: 52
                }, {
                    name: 'representative',
                    average: 99
                }, {
                    name: 'shipping',
                    average: 11
                }, {
                    name: 'conflict resolution',
                    average: 22
                }]
            }, {
                screenshot: 'img/sample/Koala.jpg',
                companyName: 'Amazon 4',
                rate: 1.3,
                serialNum: 'company-4',
                reviewsNum: 62,
                specifics: [{
                    name: 'phone support',
                    average: 89
                }, {
                    name: 'website',
                    average: 45
                }, {
                    name: 'representative',
                    average: 32
                }, {
                    name: 'shipping',
                    average: 99
                }, {
                    name: 'conflict resolution',
                    average: 65
                }]
            }, {
                screenshot: 'img/sample/Lighthouse.jpg',
                companyName: 'Amazon 5',
                rate: 2.8,
                serialNum: 'company-5',
                reviewsNum: 3682,
                specifics: [{
                    name: 'phone support',
                    average: 85
                }, {
                    name: 'website',
                    average: 28
                }, {
                    name: 'representative',
                    average: 94
                }, {
                    name: 'shipping',
                    average: 74
                }, {
                    name: 'conflict resolution',
                    average: 93
                }]
            }, {
                screenshot: 'img/sample/Tulips.jpg',
                companyName: 'Amazon 6',
                rate: 4.8,
                serialNum: 'company-6',
                reviewsNum: 343,
                specifics: [{
                    name: 'phone support',
                    average: 42
                }, {
                    name: 'website',
                    average: 55
                }, {
                    name: 'representative',
                    average: 87
                }, {
                    name: 'shipping',
                    average: 76
                }, {
                    name: 'conflict resolution',
                    average: 87
                }]
            }];
            var html = new EJS({ url: './ejs/newCompanys.ejs' }).render({ newCompanys: newCompanys });
            $("#company > .wrapper > .container > .row").html(html);

            newCompanys.forEach(function(val) {

                $("#" + val.serialNum).rateYo({
                    starWidth: "20px",
                    normalFill: "#bbb",
                    ratedFill: "#26c6da",
                    rating: val.rate,
                    readOnly: true
                });
            })

        };

        // Fake ajax load
        beforeSendHandler();
        setTimeout(function() {
            successHandler();
        }, 1200)

        // Uncomment this for real AJAX load
        // $.ajax({
        //     method: "POST",
        //     context : document.body,
        //     contentType: "application/json",
        //     data : JSON.stringify(dataToSend),
        //     url: "/ajaxHeader/",
        //     beforeSend: beforeSendHandler,
        //     success: successHandler
        // });
    }


    function equalHeight() {
        // Set equal height of 2 reviews in a row
        $('#review .row').each(function() {
            var hightestBox = 0;
            var prev;
            $('.review > .container > .wrapper', this).each(function(idx, ele) {
                if ($(this).height() > hightestBox) {
                    hightestBox = $(this).height();
                }
                console.log(idx);
                console.log(hightestBox);
                
                if (idx % 2 === 1) {
                    $(this).height(hightestBox);
                    $(prev).height(hightestBox);
                    hightestBox = 0;
                } else {
                    prev = ele;
                }
            });
        });
    };

});
