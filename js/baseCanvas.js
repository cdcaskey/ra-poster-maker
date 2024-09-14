const darkBlue = '#0b2c4c';
const lightBlue = '#114679';
const red = '#ee2e25';
const scale = 1;
const debug = false;

function updateStyle(selectedStyle) {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    clearCanvas(canvas);

    switch (selectedStyle) {
        case 3:
            style3(canvas.width, canvas.height, context);
            break;
    }
}

function clearCanvas(canvas) {
    let context = canvas.getContext("2d");

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/** 
 * Draw an image.
 * @param {context} context The context being used to draw.
 * @param {string} path The filepath of the image to be drawn.
 * @param {number} x The x value of the image's top left corner.
 * @param {number} y The y value of the image's top left corner.
 * @param {number} width The width of the image.
 * @param {number} height The height of the image.
 */
function drawImage(context, path, x, y, width, height) {
    let logo = new Image();

    logo.onload = function() { context.drawImage(logo, x, y, width, height); };
    logo.src = path;
}

/**
 * Draw the title text, over 2 lines.
 * @param {context} context The context being used to draw.
 * @param {string} line1 The text to be written on the top line.
 * @param {string} line2 The text to be written on the bottom line.
 * @param {number} x The x value of edge which corresponds with the alignment.
 * @param {number} y The y value of the top of the text.
 * @param {string} align The alignment of the text, either "left", "right", or "center".
 */
function drawTitleText(context, line1, line2, x, y, align) {
    let fontSize = 64;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    context.fillStyle = "white";
    context.textBaseline = "top";
    context.textAlign = align;
    
    context.fillText(line1, x, y);
    console.log
    context.fillText(line2, x, y + fontSize - 12.5);
}

/**
 * Calculate the lines needed to draw wrapped text using the current context font. Note: If a single word exceeds the max width, that line will exceed the max width.
 * @param {context} context The context being used to draw.
 * @param {string} text The text to be written.
 * @param {number} maxWidth The max width of a single line.
 * @returns The lines of text short enough to fit inside the maxWidth.
 */
function calculateWrappedLines(context, text, maxWidth) {
    if (text == "") {
        return [];
    }

    var words = text.split(' ');

    let lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        if (context.measureText(currentLine + " " + words[i]).width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
        }
        else {
            currentLine += " " + words[i];
        }
    }

    lines.push(currentLine);
    return lines;
}

/**
 * Draw the meeting info, including the date, time and location.
 * @param {context} context The context being used to draw.
 * @param {string} date The string being used as the meeting date.
 * @param {string} time The string being used as the meeting time.
 * @param {string} location The string being used as the location.
 * @param {Array} address An array of strings being used for the address info.
 * @param {number} x The x value of the edge which corresponds with the alignment.
 * @param {number} y The y value of the top of the info block.
 * @param {string} align The alignment of the text, either "left", "middle", or "right".
 * @returns {number} The height of the block in pixels.
 */
function meetingInfo(context, date, time, location, address, x, y, align) {
    context.translate(x, y);

    let fontSize = 32;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    context.fillStyle = "white";
    context.textBaseline = "top";
    context.textAlign = align;

    // Calculate the height of the block (Number of lines * font size)
    let blockSize = (3 + address.length) * fontSize;
    context.translate(0, -blockSize);

    context.fillText(date, 0, 0);
    context.fillText(time, 0, fontSize);
    context.fillText(location, 0, 2 * fontSize);

    context.font = fontSize + "px Fira Sans, sans-serif";
    for (let i = 0; i < address.length; i++) {
        context.fillText(address[i], 0, (3 + i) * fontSize);
    }
    
    context.translate(-x, blockSize - y);
    return blockSize;
}

/**
 * Calculate the size, in pixels, of the event info text.
 * @param {context} context The context being used to draw.
 * @param {string} title The title of the event - e.g. "Monthly Meeting".
 * @param {string} subtitle The subtitle for the event - e.g. "with special guest".
 * @param {string} mainEvent The main event - e.g. a speaker or quiz.
 * @param {string} mainEventTagline The tagline for the main event to provide context.
 * @param {number} maxWidth The maximum width of the text.
 * @returns The size in pixels of the event info text.
 */
function calculateEventInfoSize(context, title, subtitle, mainEvent, mainEventTagline, maxWidth) {
    let pixelsRequired = 0;

    context.fillStyle = "white";
    context.textBaseline = "top";
    context.textAlign = "center";

    // Calculate the title space
    let fontSize = 72;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    let titleLines = calculateWrappedLines(context, title, maxWidth);
    pixelsRequired += titleLines.length * fontSize;

    if (subtitle.length > 0 || mainEvent.length > 0 || mainEventTagline.length > 0) {
        pixelsRequired += 25;
    }

    // Calculate the subtitle space
    fontSize = 32;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    let subtitleLines = calculateWrappedLines(context, subtitle, maxWidth);
    pixelsRequired += subtitleLines.length * fontSize;

    if (mainEvent.length > 0 || mainEventTagline.length > 0) {
        pixelsRequired += 50
    }

    // Calculate the main event space
    fontSize = 96;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    let mainEventLines = calculateWrappedLines(context, mainEvent, maxWidth);
    pixelsRequired += mainEventLines.length * fontSize;

    // Calculate the main event tagline space
    fontSize = 40;
    context.font = fontSize + "px Fira Sans, sans-serif";
    let mainEventTaglineLines = calculateWrappedLines(context, mainEventTagline, maxWidth);
    pixelsRequired += mainEventTaglineLines.length * fontSize;

    return pixelsRequired;
}

function drawEventInfo(context, title, subtitle, mainEvent, mainEventTagline, x, y, maxWidth) {
    context.translate(0, y);

    context.fillStyle = "white";
    context.textBaseline = "top";
    context.textAlign = "center";

    // Draw the title
    let textY = 0;
    let fontSize = 72;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    let titleLines = calculateWrappedLines(context, title, maxWidth);
    for (let i = 0; i < titleLines.length; i++) {
        context.fillText(titleLines[i], x, textY);
        textY += fontSize;
    }

    // Add spacing if there is more event info
    if (subtitle.length > 0 || mainEvent.length > 0 || mainEventTagline.length > 0) {
        textY += 25;
    }

    // Draw the subtitle
    fontSize = 32;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    let subtitleLines = calculateWrappedLines(context, subtitle, maxWidth);
    for (let i = 0; i < subtitleLines.length; i++) {
        context.fillText(subtitleLines[i], x, textY);
        textY += fontSize;
    }

    // Add spacing if there is more event info
    if (mainEvent.length > 0 || mainEventTagline.length > 0) {
        textY += 50;
    }

    // Draw the main event
    fontSize = 96;
    context.font = "bold " + fontSize + "px Fira Sans, sans-serif";
    let mainEventLines = calculateWrappedLines(context, mainEvent, maxWidth);
    for (let i = 0; i < mainEventLines.length; i++) {
        context.fillText(mainEventLines[i], x, textY);
        textY += fontSize;
    }

    // Draw the main event tagline space
    fontSize = 40;
    context.font = fontSize + "px Fira Sans, sans-serif";
    let mainEventTaglineLines = calculateWrappedLines(context, mainEventTagline, maxWidth);
    for (let i = 0; i < mainEventTaglineLines.length; i++) {
        context.fillText(mainEventTaglineLines[i], x, textY);
        textY += fontSize;
    }

    context.translate(0, -y);
}

/**
 * Draw the main event info in the centre of the unused space (or 25px from the top if the required space exceeds that).
 * @param {context} context The context being used to draw.
 * @param {string} title The title of the event - e.g. "Monthly Meeting".
 * @param {string} subtitle The subtitle for the event - e.g. "with special guest".
 * @param {string} mainEvent The main event - e.g. a speaker or quiz.
 * @param {string} mainEventTagline The tagline for the main event to provide context.
 * @param {number} spaceFromTop The amount of used space from the top of the page.
 * @param {number} spaceFromBottom The amount of used space from the bottom of the page.
 * @param {number} x The x value of the left of the event info.
 * @param {number} maxWidth The maximum width of the text.
 */
function eventInfo(context, title, subtitle, mainEvent, mainEventTagline, topY, bottomY, x, maxWidth) {
    let pixelsRequired = calculateEventInfoSize(context, title, subtitle, mainEvent, mainEventTagline, maxWidth);

    let startY = topY + 25;
    if (pixelsRequired <= bottomY - topY) {
        let totalFreeSpace = bottomY - topY - pixelsRequired;
        startY = topY + totalFreeSpace / 2;
    }

    drawEventInfo(context, title, subtitle, mainEvent, mainEventTagline, x, startY, maxWidth);
}