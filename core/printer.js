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
    var object = obj || [
        {
            name:       'a',
            type:       'fnc',
            hash:       'fabbd539dd5622df0eb517e094fe167336590df0',
            parents:    '0,1,2',
            test:       'ok'
        },
        {
            name:       'b',
            type:       'var',
            hash:       '5314a1c127ad7998953aeaf8134651362b85146f',
            parents:    '1',
            test:       'NA'
        }
    ];


    var table = new AsciiTable('Graph');
    table.setHeading('', 'name', 'type', 'hash', 'parents', 'test');
    object.forEach(function (row, index) {
        table.addRow(
            index,
            row.name,
            row.type,
            row.hash,
            row.parents,
            row.test
        );
    });


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
}; //logger


module.exports.fileWriter =     fileWriter;
module.exports.logTable =       logTable;
module.exports.logFinal =       logFinal;
