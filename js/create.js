$(function() {
    FastClick.attach(document.body);
    
    $('.stars-overall .clear-rating').on('click', function(event) {
        event.preventDefault();

        $('#rate-overall').barrating('clear');
    });

    $('#rate-overall').barrating({
        theme: 'fontawesome-stars-o',
        fastClicks: true,
        onSelect: function(value, text) {
            console.log("asdfaf");
            if (!value) {
                $('#rate-overall').barrating('clear');
            } else {
                if (!$('#rate-overall').data('rated')) {
                    $('#rate-overall').data('rated', value);
                    repsCalc('plus', 1);
                }
                $('#rate-overall').parent().siblings('h6, p').addClass('hidden');
            }
        },
        onClear: function(value, text) {
            $('.stars-overall')
                .find('.clear-rating')
                .addClass('hidden')
                .end()
                .find('.your-rating')
                .addClass('hidden');

            repsCalc('minus', 1);
            $('#rate-overall').data('rated', false);
        }
    });

    $('.sub-option').on('click', '.clear-rating', function(event) {
        $(event.target).parent().parent().siblings('select').barrating('clear');
    });

    $('select[name="rating"]').barrating('show', {
        theme: 'bars-movie',
        fastClicks: true,
        onSelect: function(value, text) {
            $(".tooltip.hover").addClass('hidden');
            if (!value) {
                $('#' + this.$elem[0].id).barrating('clear');
            } else {
                if (!$('#' + this.$elem[0].id).data('rated')) {
                    $('#' + this.$elem[0].id).data('rated', value);
                    repsCalc('plus', 0.5);
                }
            }
        },
        onClear: function(value, text) {
            $('#' + this.$elem[0].id).data('rated', false);
            repsCalc('minus', 0.5);
        }
    });

    $('.tags.container .tag').click(function(event) {
        $(event.target).toggleClass('active');
    })

    $('textarea[name="content"]').blur(function(event) {
        var $this = $(this);
        if (event.target.value) {
            if (!$this.data('rated')) {
                $this.data('rated', true);
                repsCalc('plus', 1);
                $this.addClass('border-success');
                $this.siblings('span, p').addClass('hidden');
            }
        } else {
            if ($this.data('rated')) {
                $this.data('rated', false);
                repsCalc('minus', 1);
                $this.removeClass('border-success');
            }
        }
    });

    $('input[name="title"]').blur(function(event) {
        var $this = $(this);
        if (event.target.value) {
            $this.addClass('border-success');
            $this.siblings('span, p').addClass('hidden');
        } else {
            $this.removeClass('border-success');
        }
    });

    function repsCalc(calculator, value) {
        var $header = $('.header.create');
        $header.removeClass('hidden');
        var $rep = $header.find('.reps-hint .text-danger');
        var point = +$rep.text();
        if (calculator === 'plus') {
            $rep.text(point += value);
        } else if (calculator === 'minus') {
            $rep.text(point -= value);
        }
    }
});
