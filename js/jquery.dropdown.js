(function( $ ) {
 
  $.fn.dropdown = function( options ) {
 
    options = $.extend( $.fn.dropdown.defaults, options );
 
    // Plugin code
    return this.each( function() {

        var $selector = $( this );
        var $container = $( this ).next('.dropdown');
        $container.css({
            'display': 'none',
            'position': 'absolute',
            'width': 'auto',
            'box-shadow': '0 6px 12px #888',
            'background-color': options.bgColor,
            'color': options.color,
            'fontStyle': options.fontStyle,
            'padding': options.padding,
            'border': options.border,
            'borderRadius': options.borderRadius,
            'margin': options.margin
        })
        var position = $selector.position();
        $container.offset({top: position.top + $selector.height() + 30, left: position.left});
        $selector.click(function () {
            $container.toggle();
            $(document).on('mouseup.hideDropdown', function(e) {
                if (!$container.is(e.target) // if the target of the click isn't the container...
                    && $container.has(e.target).length === 0 // ... nor a descendant of the container
                    && (e.target !== $('html').get(0)) // nor the scrollbar
                    && !$selector.is(e.target) // nor the target of the click isn't selector itself
                    && $selector.has(e.target).length === 0) // ... nor a descendant of the selector
                {
                    $container.hide();
                    // $selector.removeClass('active');
                    // $("nav.navigation").css("box-shadow", "none");
                    $(document).off('.hideDropdown'); // stop listening on this namespace
                }
            });
        })
 
    });
 
  }
 
  // Set up the default options.
  $.fn.dropdown.defaults = {
    color : '#222',
    bgColor: '#fff',
    fontStyle : 'normal',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '5px'
  };
 
})( jQuery );