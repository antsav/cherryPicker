// vendor libs - core
var fs =                require('fs');
var colors =            require('colors');
var AsciiTable =        require('ascii-table')

var fileWriter = function (cherryAst) {

    if (!fs.existsSync(__dirname + "/public/js/build")) {
        fs.mkdir(__dirname + "/public/js/build");
        console.log('build directory created'.blue);
    } else {
        console.log('overwriting files in build'.blue);
    }

    var wstream = fs.createWriteStream(__dirname + '/public/js/build/lib.js');
    wstream.write(cherryAst, 'utf8');
    // todo: fix error with callback
    wstream.end();
}; //fileWiter

var logFinal = function (orBytes, comBytes) {
    console.log("The library compiled!".green);
    console.log(
        "File size dropped from: " + colors.red(fileContent.length) +
            " to: " + colors.green(cherryAst.length) + " symbols"
    );
    var percent = 100 - (cherryAst.length * 100) / fileContent.length;
    var barSaved = Array(percent.toFixed(0) - 1).join("\u2588");
    var barUsed  = Array((100 - percent.toFixed(0)) - 1).join("\u2588");
    console.log(
        (percent.toFixed() + '%').red + " " +
            (barSaved).red +
            (barUsed).green + ' ' +
            ((100 - percent).toFixed() + '%').green
    );
}; //logger


module.exports.fileWriter =     fileWriter;
module.exports.logFinal =       logFinal;
