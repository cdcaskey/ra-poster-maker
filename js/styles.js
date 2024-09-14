var selectedStyle = 0;

// Disabled while only one style available
// $('.styleImage').click(function () {
//     $('.selected').removeClass('selected')
//     $(this).addClass('selected');
//     selectedStyle = parseInt($(this).attr('value'));

//     updateStyle(selectedStyle);
// });

$('.posterInput').on('input', function() {
    updateStyle(selectedStyle);
});

$('.posterInput').on('textarea', function() {
    updateStyle(selectedStyle);
});

$(function () {
    $('.selected').removeClass('selected')
    $('.styleImage[value=3]').addClass('selected');

    selectedStyle = 3;
    updateStyle(selectedStyle);
})