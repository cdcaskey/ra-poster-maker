var selectedStyle = 0;

// Disabled while only one style available
// $('.style-image').click(function () {
//     $('.selected').removeClass('selected')
//     $(this).addClass('selected');
//     selectedStyle = parseInt($(this).attr('value'));

//     updateStyle(selectedStyle);
// });

$('.poster-input').on('input', function() {
    updateStyle(selectedStyle);
});

$('.poster-input').on('textarea', function() {
    updateStyle(selectedStyle);
});

$(function () {
    $('.selected').removeClass('selected')
    $('.style-image[value=3]').addClass('selected');

    selectedStyle = 3;
    updateStyle(selectedStyle);
})