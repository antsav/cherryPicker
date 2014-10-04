// vendor libs - core
var fs =                require('fs');
var colors =            require('colors');
var AsciiTable =        require('ascii-table');

var fileWriter = function (cherryAst) {

    if (!fs.existsSync("./public/js/build")) {
        fs.mkdir("./public/js/build");
        console.log('build directory created'.blue);
    } else {
        console.log('overwriting files in build'.blue);
    }

    var wstream = fs.createWriteStream('./public/js/build/lib.js');
    wstream.write(cherryAst, 'utf8');
    wstream.end();
}; //fileWiter

var logTable = function (obj) {
    var table = new AsciiTable('A Title');
    table
        .setHeading('', 'Name', 'Age')
        .addRow(1, 'Bob', 52)
        .addRow(2, 'John', 34)
        .addRow(3, 'Jim', 83)

    console.log(table.toString());
}

var logFinal = function (orBytes, comBytes) {
//    console.log(orBytes, comBytes);
    console.log("The library compiled!".green);
    console.log(
        "File size dropped from: " + colors.red(orBytes) +
            " to: " + colors.green(comBytes) + " bytes"
    );
    var percent = 100 - (comBytes * 100) / orBytes;
    var barSaved = Array(percent.toFixed(0) - 1).join("\u2588");
    var barUsed  = Array((100 - percent.toFixed(0)) - 1).join("\u2588");
    console.log(
        (percent.toFixed() + '%').red + " " +
            (barSaved).red +
            (barUsed).green + ' ' +
            ((100 - percent).toFixed() + '%').green
    );
    logTable();
}; //logger


module.exports.fileWriter =     fileWriter;
module.exports.logFinal =       logTable;
module.exports.logFinal =       logFinal;