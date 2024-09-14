/* Requires baseCanvas.js to run */

function style3(width, height, context) {
    let nameTop = $('#name-top').val().toUpperCase();
	let nameBottom = $('#name-bottom').val().toUpperCase();
	let title = $('#title').val().toUpperCase();
	let subtitle = $('#subtitle').val();
	let event = $('#event').val().toUpperCase();
	let eventTagline = $('#event-tagline').val();
	let date = $('#date').val().toUpperCase();
	let time = $('#time').val().toUpperCase();
	let location = $('#location').val().toUpperCase();
	let addressString = $('#address').val();
    let address = [];
    if (addressString != "") {
        address = addressString.split('\n');
    }

    context.fillStyle = lightBlue;
    context.fillRect(0, 0, width, height);

    // Add a 25px buffer around the image
    if (debug) {
        let oldColour = context.fillStyle;

        context.fillStyle = "#666";
        context.fillRect(0, 0, width, height);

        context.fillStyle = oldColour;
        context.fillRect(25, 25, width - 50, height - 50);
    }


    header(context, nameTop, nameBottom, 0, 0, width);
    let bottomSpaceUsed = meetingInfo(context, date, time, location, address, 25, height - 25, "left");
    eventInfo(context, title, subtitle, event, eventTagline, 200, height - 25 - bottomSpaceUsed, width / 2, width - 50);
}

/**
 * Draw the header.
 * @param {context} context The context being drawn on.
 * @param {string} line1 The text to be displayed on line 1.
 * @param {string} line2 The text to be displayed on line 2.
 * @param {number} x The x value of the top left corner of the header.
 * @param {number} y The y value of the top left corner of the header.
 * @param {number} width The width of the header.
 */
function header(context, line1, line2, x, y, width) {
    context.translate(x, y);

    context.fillStyle = darkBlue;
    context.fillRect(0, 0, width, 200);
    drawImage(context, "./img/RA-WhiteText.png", width - 120 - 25, 25, 120, 150);
    drawTitleText(context, line1, line2, width - 170, 46, "right");

    context.translate(-x, -y);
}