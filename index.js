// vendor libs - core
var async =             require('async');
var colors =            require('colors');
var fs =                require('fs');
var UglifyJS =          require('uglify-js');

// vendor libs - redundant
var console =           require('better-console');



var projectGraph = [
    {
        name:       'a',
        hash:       '123',
        parentIds:  [],
        tested:     false
    }
];

var libraryFile = __dirname + '/public/js/lib/demoLib1.js';
var projectFile = __dirname + '/public/js/demoFile1.js';

// todo: read files array in parallel
var libraryFiles = [
    __dirname + '/public/js/lib/demoLib1.js'
];




fs.readFile(libraryFile, 'utf8', function read(err, fileContent) {
    if (err) { throw err; }

    var ast = UglifyJS.parse(fileContent); // Abstract Syntax Tree
    var cherryBody = []; // flushing body

    //cherryPicking
    ast.body.forEach(function (libFn, libIdx) {
        projectGraph.forEach(function (projFn) {
            if (libFn.name.name === projFn.name) {
                cherryBody.push(ast.body[libIdx]);
            }
        });
    });

//    console.log(cherryBody);

    var compressor = UglifyJS.Compressor({warnings:false}); //init compressor

    ast.body = cherryBody;
    var cherryAst = ast.transform(compressor).print_to_string();

    if (!fs.existsSync(__dirname + "/public/js/build")) {
        fs.mkdir(__dirname + "/public/js/build");
        console.info("build directory created");
    } else {
        console.info("overwriting files in build");
    }


    var wstream = fs.createWriteStream(__dirname + '/public/js/build/lib.js');
    wstream.write(cherryAst, 'utf8');
    console.log("The library compiled!".green);
    console.log(
        "File size dropped from: " + colors.red(fileContent.length) +
        " to: " + colors.green(cherryAst.length) + " symbols"
    );
    var percent = 100 - (cherryAst.length * 100) / fileContent.length;
    var barSaved = Array(percent.toFixed(0) - 1).join('.');
    var barUsed  = Array((100 - percent.toFixed(0)) - 1).join('|');
    console.log(
        colors.red(barSaved) +
        colors.green(barUsed)
    );
    console.log(colors.blue(percent.toFixed(2) + '% saved'));
    wstream.end();

});