$(function() {

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    $('.menu.reviews').on('click.hideDropdownMenu', function(event) {
        console.log(event);
        var $this = $(this);
        var $reviews = $("#reviews");

        // add color to selected text.
        $this.addClass('active').siblings().removeClass('active');

        var container = $reviews;
        var category = container.find('.category.active').data("cat");
        ajaxAppendReviews({ cat: category });

        animationDropdown($this, container);
    });

    $('.menu.businesses').on('click.hideDropdownMenu', function(event) {
        var $this = $(this);
        var $businesses = $("#businesses");

        // add color to selected text.
        $this.addClass('active').siblings().removeClass('active');

        var container = $businesses;
        var category = container.find('.category.active').data("cat");
        ajaxAppendBusinesses({ cat: category });

        animationDropdown($this, container);
    });

    $('.menu.blogs').on('click.hideDropdownMenu', function(event) {
        var $this = $(this);
        var $blogs = $("#blogs");

        // add color to selected text.
        $this.addClass('active').siblings().removeClass('active');

        var container = $blogs;
        ajaxAppendBlogs(1);

        animationDropdown($this, container);
    });

    // On category-reviews selected in dropdown menu.
    $(document).on('click', '.dropdown-menu .category.reviews', function() {
        // add color to selected category.
        $(this).addClass('active').siblings().removeClass('active');

        var category = $('.dropdown-menu .category.reviews.active').data("cat");
        ajaxAppendReviews({ cat: category });
    })

    // On category-business selected in dropdown menu.
    $(document).on('click', '.dropdown-menu .category.businesses', function() {
        // add color to selected category.
        $(this).addClass('active').siblings().removeClass('active');

        var category = $('.dropdown-menu .category.businesses.active').data("cat");
        ajaxAppendBusinesses({ cat: category });
    })

    $(document).on('click', '.businessBtn', function() {
        $(this).addClass('active').siblings().removeClass('active');
    })

    $(document).on('click', '.close-icon', function() {
        // close mobile menu
        $('.subnav-mobile').addClass('hide').removeClass('shown');
        $('.navigation-mobile').addClass('hide').removeClass('shown');
        $('.navigation-overlay').addClass('hidden').removeClass('shown');
        // close dropdown menu
        $('.dropdown-menu').slideUp();
        $("nav.navigation").css("box-shadow", "none");
        $(document).off('.hideDropdownMenu'); // stop listening on this namespace
    })

    $(document).on('click', '.backBtn', function() {
        $('.subnav-mobile').addClass('hide').removeClass('shown');
        $(document).off('.hideSubnav');
    })

    // open left navbar when hamburger icon clicked
    $('.menu-icon').on('click.hideSlideright', function(event) {
        var container = $('.navigation-mobile');
        container.removeClass('hide').addClass('shown');
        var overlay = $('.navigation-overlay');
        overlay.removeClass('hidden').addClass('shown');
        var subnav = $('.subnav-mobile');

        $(document).on('mouseup.hideSlideright', function(e) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0 // ... nor a descendant of the container
                && (e.target !== $('html').get(0)) // nor the scrollbar
                && !subnav.is(e.target) && subnav.has(e.target).length === 0) {
                container.addClass('hide').removeClass('shown');
                overlay.addClass('hidden').removeClass('shown');
                $(document).off('.hideSlideright'); // stop listening on this namespace
            }
        });
    });

    // On mobile, open sub-nav when top-level menu is clicked. 
    $(document).on('click', '.top-level', function() {
        $this = $(this);

        if ($this.text() === 'REVIEWS' || $this.text() === 'BUSINESSES') {
            var $sub = $this.next('.sub-level');
            var $otherSub = $sub.siblings('.sub-level');
            $sub.slideToggle();
            if ($otherSub.is(':visible')) {
                $otherSub.slideUp();
            }
        } else if ($this.text() === 'BLOGS') {
            showSubNav('Blogs', " ");
            var $otherSub = $this.siblings('.sub-level');
            if ($otherSub.is(':visible')) {
                $otherSub.slideUp();
            }
        }
    })

    // On mobile, open sub navbar when category clicked.
    $(document).on('click', '.navigation-mobile .category', function(event) {
        // add color to selected category.
        $('.category').removeClass('active');
        $(this).addClass('active');

        showSubNav(event.target.innerText, event.target.className);
    });

    function showSubNav(category, categoryName) {
        var container = $('.navigation-mobile');
        var overlay = $('.navigation-overlay');
        var subnav = $('.subnav-mobile');

        subnav.html("<div class='close-icon'>" +
            "<div class='icon-close'></div>" +
            "</div>" +
            "<div class='backBtn'>Back to Top Menus</div>" +
            "<div class='category-text'></div>"
        );
        // copy the category name clicked to subnav
        subnav.find('.category-text').text(category);
        // show SubNav
        subnav.removeClass('hide').addClass('shown');

        if (categoryName.indexOf('reviews') !== -1) {
            var category = $('.navigation-mobile .category.reviews.active').data("cat");
            ajaxAppendReviewsMobile({ cat: category });
        }
        if (categoryName.indexOf('businesses') !== -1) {
            var category = $('.navigation-mobile .category.businesses.active').data("cat");
            ajaxAppendBusinessesMobile({ cat: category });
        }
        if (category === 'Blogs') {
            ajaxAppendBlogsMobile();
        }

        $(document).trigger("mouseup.hideSubnav"); // add namespace
        $(document).on('mouseup.hideSubnav', function(e) {

            if (!subnav.is(e.target) // if the target of the click isn't the container...
                && subnav.has(e.target).length === 0) // ... nor a descendant of the container
            {
                subnav.addClass('hide').removeClass('shown');
                container.addClass('hide').removeClass('shown');
                overlay.addClass('hidden').removeClass('shown');

                $(document).off('.hideSubnav'); // stop listening on this namespace
            }
        });
    }

    function ajaxAppendReviews(dataToSend) {
        var beforeSendHandler = function() {
            $(".reviews-container").html("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            console.log(data);
            var newReviews = [];
            data.forEach(function(val, idx) {
                newReviews.push({
                    companyName: val.companyName,
                    date: val.momented,
                    content: val.reviewText,
                    useful: val.usefulnessResults.useful,
                    notuseful: val.usefulnessResults.useless,
                    repPoints: val.anonId ? val.anonId.repPoints : val.userId.repPoints,
                    username: val.anonId ? val.anonId.shortId : val.userId.username,
                    profileImg: './img/android-contact.png'
                })
            })

            var html = new EJS({ url: './ejs/newReviews.ejs' }).render({ newReviews: newReviews });
            $(".reviews-container").append(html);
            $('#loadingImg').remove();

            // calculate the height
            var highestBox1 = 0,
                highestBox2 = 0;
            $(".review-box").each(function(idx, box) {
                if (idx < 3) {
                    if ($(box).height() > highestBox1) {
                        highestBox1 = $(box).height();
                    }
                } else {
                    if ($(box).height() > highestBox2) {
                        highestBox2 = $(box).height();
                    }
                }
            })
            console.log(highestBox1);
            console.log(highestBox2);
            $(".review-box").each(function(idx, box) {
                if (idx < 3) {
                    $(box).height(highestBox1);
                } else {
                    $(box).height(highestBox2);
                }
            })
        };

        $.ajax({
            method: "POST",
            context: document.body,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            url: "/ajaxHeader/",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    function ajaxAppendReviewsMobile(dataToSend) {
        var beforeSendHandler = function() {
            $(".subnav-mobile").append("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            console.log(data);
            var newReviews = [];
            data.forEach(function(val, idx) {
                newReviews.push({
                    companyName: val.companyName,
                    date: val.momented,
                    content: val.reviewText,
                    useful: val.usefulnessResults.useful,
                    notuseful: val.usefulnessResults.useless,
                    repPoints: val.anonId ? val.anonId.repPoints : val.userId.repPoints,
                    username: val.anonId ? val.anonId.shortId : val.userId.username,
                    profileImg: './img/android-contact.png'
                })
            })
            var html = new EJS({ url: './ejs/newReviews.ejs' }).render({ newReviews: newReviews });
            $(".subnav-mobile").append(html);
            $('#loadingImg').remove();
        };

        $.ajax({
            method: "POST",
            context: document.body,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            url: "/ajaxHeader/",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    function ajaxAppendBusinesses(dataToSend) {
        var beforeSendHandler = function() {
            $(".businesses-container").html("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            console.log(data);
            var newBusinesses = [];
            data.forEach(function(val, idx) {
                newBusinesses.push({
                    companyName: val.name,
                    reviewsNum: (val.reviews && val.reviews.length) || 0,
                    upvotesNum: val.upVotes,
                    downvotesNum: val.downVotes
                })
            })
            var html = new EJS({ url: './ejs/newBusinesses.ejs' }).render({ newBusinesses: newBusinesses });
            $(".businesses-container").append(html);
            $('#loadingImg').remove();
        };

        $.ajax({
            method: "POST",
            context: document.body,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            url: "/ajaxBusiness/",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    function ajaxAppendBusinessesMobile(dataToSend) {
        var beforeSendHandler = function() {
            $(".subnav-mobile").append("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            console.log(data);
            var newBusinesses = [];
            data.forEach(function(val, idx) {
                newBusinesses.push({
                    companyName: val.name,
                    reviewsNum: (val.reviews && val.reviews.length) || 0,
                    upvotesNum: val.upVotes,
                    downvotesNum: val.downVotes
                })
            })
            var html = new EJS({ url: './ejs/newBusinessesMobile.ejs' }).render({ newBusinesses: newBusinesses });
            $(".subnav-mobile").append(html);
            carouselAutoPlay(3000);
            $('#loadingImg').remove();
        };

        $.ajax({
            method: "POST",
            context: document.body,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            url: "/ajaxBusiness/",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    function ajaxAppendBlogs(dataToSend) {
        var beforeSendHandler = function() {
            $("#blogs .container").html("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            var html = new EJS({ url: './ejs/newBlogs.ejs' }).render({ newBlogs: data });
            $("#blogs .container").append(html);
            $('#loadingImg').remove();
        };

        $.ajax({
            method: "POST",
            context: document.body,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            url: "/ajaxHeader/",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    function ajaxAppendBlogsMobile(dataToSend) {
        var beforeSendHandler = function() {
            $(".subnav-mobile").append("<img id='loadingImg' width='50' src='img/loading.gif'/>");
        };

        var successHandler = function(data) {
            console.log(data);
            var html = new EJS({ url: './ejs/newBlogsMobile.ejs' }).render({ newBlogs: data });
            $(".subnav-mobile").append(html);
            $('#loadingImg').remove();
        };

        $.ajax({
            method: "POST",
            context: document.body,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            url: "/ajaxHeader/",
            beforeSend: beforeSendHandler,
            success: successHandler
        });
    }

    function animationDropdown($menu, $container) {
        $container.slideToggle();
        $("nav.navigation").css("box-shadow", "3px 3px 3px #888");
        $(document).on('mouseup.hideDropdownMenu', function(e) {
            if (!$container.is(e.target) // if the target of the click isn't the container...
                && $container.has(e.target).length === 0 // ... nor a descendant of the container
                && (e.target !== $('html').get(0)) // nor the scrollbar
                && !$menu.is(e.target) // nor the target of the click isn't menu-text itself
                && $menu.has(e.target).length === 0) // ... nor a descendant of the menu-text
            {
                $container.slideUp();
                $menu.removeClass('active');
                $("nav.navigation").css("box-shadow", "none");
                $(document).off('.hideDropdownMenu'); // stop listening on this namespace
            }
        });
    }

    function carouselAutoPlay(interval) {
        var carousel = {
            ittem: $('#carousel'),
            interval: interval,
            items: $('.carousel-active'),
            itemsLength: 0,
            controls: $('.carousel-indicator'),
            controlsLength: 0
        };
        var carouselTimer = setInterval(carouselPlay, carousel.interval);

        carousel.itemsLength = carousel.items.length;
        carousel.controlsLength = carousel.controls.length;

        function carouselControls() {
            for (var i = carousel.controlsLength; i--;) {
                carousel.controls[i].addEventListener('click', carouselReset, false);
            }
        }

        function carouselPlay() {
            for (var i = carousel.itemsLength; i--;) {
                if (carousel.items[i].checked) {
                    if (i !== carousel.itemsLength - 1) {
                        carousel.items[i + 1].checked = true;
                    } else if (i === carousel.itemsLength - 1) {
                        setTimeout(function() {
                            carousel.items[0].checked = true;
                        }, 0);
                    }
                }
            }
        }

        function carouselReset() {
            clearInterval(carouselTimer);
            carouselTimer = setInterval(carouselPlay, carousel.interval);
        }
        carouselControls();
    }

    /* login modal effect start */
    $('.signin, .sign-icon').on('click', function() {
        $('#modal').addClass('md-show');
    })

    $('.modal--close, #skip').on('click', function(e) {
        $('#modal').removeClass('md-show');
        e.preventDefault();
    })

    $('a[name="signup"]').click(function(event) {
        $('a[name="signup"], #login, .login').addClass('hidden');
        $('a[name="login"], #signup, .signup').removeClass('hidden');
        $('#modal .title').text('Sign Up')
    })

    $('a[name="login"]').click(function(event) {
            $('a[name="login"], #signup, .signup').addClass('hidden');
            $('a[name="signup"], #login, .login').removeClass('hidden');
            $('#modal .title').text('Log In')
        })
        /* login modal effect end */


    if (typeof (Dropzone) !== 'undefined') {
        Dropzone.autoDiscover = false;
        myDropzone = new Dropzone("#addPhoto", {
            url: "/ajaxReviewImage",
            method: "post",
            // thumbnailWidth: 80,
            // thumbnailHeight: 80,
            // parallelUploads: 20,
            maxThumbnailFilesize: 15, //MB
            maxFilesize: 15,
            maxFiles: 9,
            autoProcessQueue: true, // false to stop auto processing uploads
            acceptedFiles: "image/*",
            // addRemoveLinks: true, // this only remove file from preview zone.
            // previewContainer: "#previews",
            clickable: "#addPhoto",
            paramName: "file"
        });

        // Custom formdata before send. formdata is what uploaded to server.
        // myDropzone.on("sending", function (file, xhr, formData) {
        //     console.log(file)
        //     formData.append("file", file);
        // });

        myDropzone.on("maxfilesexceeded", function(file) { this.removeFile(file); });

        myDropzone.on("complete", function(file) {
            if (!$('#addPhoto').data('rated')) {
                $('#addPhoto').data('rated', true);
                repsCalc('plus', 1);
            }
        });

        // Used with option addRemovelinks: true
        // myDropzone.on("removedfile", function(file) {
        //     if (myDropzone.files.length === 0) {
        //         repsCalc('minus', 1);
        //     }
        // });
    }

    var dialogSetUp = (function() {

        function authButtonClicked() {
            $("#signup, #login, #skip").on("click", function(e) {
                // var target = $(e.target);
                // var id = target.context.id
                optionChosen = $(this).attr("id");
                if (typeof (isSubmit) !== 'undefined' && isSubmit) {
                    if (reviewDataValidation()) {
                        var dataToSend = Object.assign(
                            getDataForAuth(optionChosen), 
                            { review: getDataForReview() }
                        );
                        console.log(dataToSend);
                        dataToSend = JSON.stringify(dataToSend);
                        //send request to server if authentication was successful redirect to /reviewFor
                        //If unsuccessful send error message
                        //unsuccessful is when authenticatation fails
                        sendDataToServer()    
                        isSubmit = false;
                    }
                } else {
                    var dataToSend = getDataForAuth(optionChosen);
                    console.log(dataToSend);
                    dataToSend = JSON.stringify(dataToSend);
                    //send request to server if authentication was successful redirect to /reviewFor
                    //If unsuccessful send error message
                    //unsuccessful is when authenticatation fails

                    sendDataToServer();
                }

                function sendDataToServer() {
                    $.ajax({
                        method: "POST",
                        url: "/" + optionChosen,
                        data: dataToSend,
                        contentType: "application/json",
                        success: function(data) {
                            console.log("success");
                            appendUserInfo(data);
                            $('.modal--close').trigger('click');
                        },
                        error: function() {
                            console.log("error");
                            $('.modal--body .warning').removeClass('hidden');
                        }
                    });
                }
                
            })
        }

        function reviewSubmitButtonClicked() {
            $("#submit, #submitFB").on("click", function() {  // TODO: change to real user session
                isSubmit = true;
                if ($('.signin').hasClass('hidden') ||
                    $('.sign-icon').hasClass('hidden')) { // user has login
                    $('#skip').trigger('click');
                } else { // user hasn't login
                    $('.signin').trigger('click');
                }

            });
        }

        function reviewDataValidation() {
            var $overall = $('#rate-overall');
            var $title = $('input[name="title"]');
            var $reviewText = $('textarea[name="content"]');
            /* validation start */
            if (!$overall.data('rated')) {
                $overall.parent().siblings('h6, p').removeClass('hidden');
                event.preventDefault();
                $('html, body').animate({ scrollTop: 200 }, 500, 'swing');
                $('.header.create').addClass('hidden');
                return false;
            }

            if (!$title.val()) {
                $title.siblings('span, p').removeClass('hidden');
                event.preventDefault();
                $title.focus();
                $('html, body').animate({ scrollTop: $title.offset().top - $title.height() - 70 }, 500, 'swing');
                $('.header.create').addClass('hidden');
                return false;
            }
            if (!$reviewText.val()) {
                $reviewText.siblings('span, p').removeClass('hidden');
                event.preventDefault();
                $reviewText.focus();
                $('.header.create').addClass('hidden');
                return false;
            }
            return true;
        }

        function getDataForReview() {
            var data = {};
            var $overall = $('#rate-overall');
            var $title = $('input[name="title"]');
            var $reviewText = $('textarea[name="content"]');

            console.log(reviewDataValidation())

            data.overall = $overall.data('rated');
            data.specifics = [];
            $('select[name="rating"]').each(function(idx, ele) {
                if ($(ele).data('rated')) {
                    var score = $(ele).data('rated');

                    data.specifics.push({
                        score: score,
                        textAnswer: $(ele).find('option[value="' + score + '"]').data('html'),
                        question: $(ele).parent().parent().prev('div').text(),
                        specific: $(ele).parent().parent().parent().siblings('h6').text().trim()
                    })
                }
            })

            data.titleReview = $title.val();
            data.reviewText = $reviewText.val();
            data.positiveWords = [];
            $('.tags.positive .active').each(function(idx, ele) {
                data.positiveWords.push(ele.innerHTML.substr(2));
            });
            data.negativeWords = [];
            $('.tags.negtive .active').each(function(idx, ele) {
                data.negativeWords.push(ele.innerHTML.substr(2));
            });

            data.photo = [];
            if (typeof (myDropzone) !== 'undefined') {
                myDropzone.getAcceptedFiles().forEach(function(item) {
                    data.photo.push(item.name);
                });    
            }

            return data;
        }

        function getDataForAuth(type) {
            $self = $("." + type);
            return {
                "login": {
                    email: $self.find("input[name='email']").val(),
                    password: $self.find("input[name='password']").val(),
                    action: "logIn"
                },
                "signup": {
                    email: $self.find("input[name='email']").val(),
                    username: $self.find("input[name='username']").val(),
                    password: $self.find("input[name='password']").val(),
                    action: "signUp"
                },
                "skip": {
                    action: "skip"
                }
            }[type]
        }

        return {
            reviewSubmitButtonClicked,
            authButtonClicked
        }
    })()

    dialogSetUp.reviewSubmitButtonClicked();
    dialogSetUp.authButtonClicked();

    // TODO: rewrite this to get info from real session
    if (sessionStorage.getItem('username') && sessionStorage.getItem('password')) {
        appendUserInfo();
    }

    // append user info on top header
    function appendUserInfo(user) {
        console.log(user);
        if (typeof(user) === 'object') { // TODO: depends on what really send back from server
            $('.signin').addClass('hidden');
            $('.sign-icon').addClass('hidden');
            var html = new EJS({ url: './ejs/user.ejs' }).render({ user: user });
            $('.nav-right').append(html);
            $('.nav-right .userInfo').dropdown({ fontStyle: 'bold' });
            $('.logout').click(function() {
                $('.signin').removeClass('hidden');
                $('.sign-icon').removeClass('hidden');
                $('.userInfo + .dropdown').remove();
                $('.nav-right .userInfo').remove();
            });
        }
    }

    // search
    $('.nav-right > .search').click(function() {
        $(this).toggleClass('active');
        $('.search--dropdown').toggle();
    });
})
