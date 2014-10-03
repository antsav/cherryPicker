// vendor libs - core
var async =             require('async');
var fs =                require('fs');
var UglifyJS =          require('uglify-js');


// local libs
var printer =           require('./core/printer');

var projectGraph = [
    {
        name:       'a',
        hash:       '123',
        parentIds:  [],
        tested:     false
    }
];
var projectFile = __dirname + '/public/js/demoFile1.js';
var libraryFile = __dirname + '/public/js/lib/demoLib1.js';

var libraryFiles = ['/public/js/lib/demoLib1.js'];


// adding root path to all files
for (var i = 0 ; i < libraryFiles.length; i += 1) {
    libraryFiles[i] = __dirname + libraryFiles[i];
}


//--------------------------ASYNC---------------------start
// functions array generator
var libraryFilesFnArr = [];
for (var i = 0; i < libraryFiles.length; i += 1) {
    var idx = i; // hack
    libraryFilesFnArr[i] = function(callback) {
        fs.readFile(libraryFiles[idx],
            'utf8', function (err, result) {
                // Abstract Syntax Trees
                callback(err, UglifyJS.parse(result))
            });
    }
} //for


async.parallel(libraryFilesFnArr, function(err, ast) {
    if (err) { throw err; }
    var cherryBody = [];

//    //cherryPicking
//    ast.body.forEach(function (libFn, libIdx) {
//        projectGraph.forEach(function (projFn) {
//            if (libFn.name.name === projFn.name) {
//                console.log(libFn.name.name, projFn.name);
//                cherryBody.push(ast.body[libIdx]);
//            }
//        });
//    });
//
//    var compressor = UglifyJS.Compressor({warnings:false}); //init compressor
//    ast.body = cherryBody; // replacing with cherryBody
//    var cherryAst = ast.transform(compressor).print_to_string();
//
//    // creating build directory
//    if (!fs.existsSync(__dirname + "/public/js/build")) {
//        fs.mkdir(__dirname + "/public/js/build");
//        console.info("build directory created");
//    } else {
//        console.info("overwriting files in build");
//    }
//
//
//    // writing compiled result
//    var wstream = fs.createWriteStream(__dirname + '/public/js/build/lib.js');
//    wstream.write(cherryAst, 'utf8');
//        console.log("The library compiled!".green);
//        console.log(
//            "File size dropped from: " + colors.red(fileContent.length) +
//                " to: " + colors.green(cherryAst.length) + " symbols"
//        );
//        // output console
//        var percent = 100 - (cherryAst.length * 100) / fileContent.length;
//        var barSaved = Array(percent.toFixed(0) - 1).join('|');
//        var barUsed  = Array((100 - percent.toFixed(0)) - 1).join('|');
//        console.log(
//            colors.red(barSaved) +
//                colors.green(barUsed)
//        );
//        console.log(colors.blue(percent.toFixed(2) + '% saved'));
//    wstream.end();
});

//--------------------------ASYNC---------------------stop




fs.readFile(libraryFile, 'utf8', function read(err, fileContent) {
    if (err) { throw err; }

    var ast = UglifyJS.parse(fileContent); // Abstract Syntax Tree
    var cherryBody = [];

    //cherryPicking
    ast.body.forEach(function (libFn, libIdx) {
        projectGraph.forEach(function (projFn) {
            if (libFn.name.name === projFn.name) {
                console.log(libFn.name.name, projFn.name);
                cherryBody.push(ast.body[libIdx]);
            }
        });
    });

    var compressor = UglifyJS.Compressor({warnings:false}); //init compressor

    ast.body = cherryBody;
    var cherryAst = ast.transform(compressor).print_to_string();

    printer.fileWriter(cherryAst);



});



//
//var table = new AsciiTable('A Title')
//table
//    .setHeading('', 'Name', 'Age')
//    .addRow(1, 'Bob', 52)
//    .addRow(2, 'John', 34)
//    .addRow(3, 'Jim', 83)
//
//console.log(table.toString())