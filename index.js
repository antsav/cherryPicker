// vendor libs - core
var async =             require('async');
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
    var ast = UglifyJS.parse(fileContent); // syntax tree
    var cherryAst = ast;
        cherryAst.body = []; // flushing body

    //cherryPicking
    ast.body.forEach(function (libFn, libIdx) {
        projectGraph.forEach(function (projFn) {
            console.log(libFn.name.name, projFn.name);

            if (libFn.name.name === projFn.name) {
                cherryAst.body.push();
            }
        });
    });

    var compressor = UglifyJS.Compressor(); // compressing what's left
    ast = ast.transform(compressor).print_to_string();

    if (!fs.existsSync(__dirname + "/public/js/build")) {
        fs.mkdir(__dirname + "/public/js/build");
        console.info("build directory created");
    } else {
        console.info("overwriting files in build");
    }


    var wstream = fs.createWriteStream(__dirname + '/public/js/build/lib.js');
    wstream.write(ast, 'utf8');
    console.info("The library compiled!");
    console.log(console.log(ast));
    wstream.end();

});