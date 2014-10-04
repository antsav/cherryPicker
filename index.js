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




////--------------------------ASYNC---------------------start
//functions array generator
var libraryFilesFnArr = [];
//for (var i = 0; i < libraryFiles.length; i += 1) {
//    var idx = i; // hack
//    libraryFilesFnArr[i] = function(callback) {
//        fs.readFile(libraryFiles[idx],
//            'utf8', function (err, result) {
//                // Abstract Syntax Trees
//                return callback(err, UglifyJS.parse(result))
//            });
//    }
//} //for

for (var i = 0; i < libraryFiles.length; i += 1) {

    libraryFilesFnArr[i] = function (callback) {
        fs.readFile(libraryFiles[0],
            'utf8', function (err, result) {
                var ast = UglifyJS.parse(result);
                return callback(null, ast);
            });
    }
} //for



async.parallel(
[
    function (callback) {
        fs.readFile(libraryFiles[0],
            'utf8', function (err, result) {
                var ast = UglifyJS.parse(result);
                return callback(null, ast);
            });
    }

]
    ,
    //final callback
    function(err, result) {
    var fileOneOut = result[0].print_to_string();
    var cherryBody = [];

    //cherryPicking
    result[0].body.forEach(function (libFn, libIdx) {
        projectGraph.forEach(function (projFn) {
            if (libFn.name.name === projFn.name) {
                console.log(libFn.name.name, projFn.name);
                cherryBody.push(result[0].body[libIdx]);
            }
        });
    });

    var compressor = UglifyJS.Compressor({warnings:false}); //init compressor
    result[0].body = cherryBody; // replacing with cherryBody
    var cherryAst = result[0].transform(compressor).print_to_string();

    printer.fileWriter(cherryAst);
    printer.logFinal(
        Buffer.byteLength(fileOneOut, 'utf8'),
        Buffer.byteLength(cherryAst, 'utf8')
    );
});

//--------------------------ASYNC---------------------stop





//------------------------OLD APPROACH----------------start
//
//fs.readFile(libraryFile, 'utf8', function read(err, fileContent) {
//    if (err) { throw err; }
//
//    var ast = UglifyJS.parse(fileContent); // Abstract Syntax Tree
//    var cherryBody = [];
//
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
//
//    ast.body = cherryBody;
//    var cherryAst = ast.transform(compressor).print_to_string();
//
//    printer.fileWriter(cherryAst);
//    printer.logFinal(
//        Buffer.byteLength(fileContent, 'utf8'),
//        Buffer.byteLength(cherryAst, 'utf8')
//    );
//});
//------------------------OLD APPROACH----------------stop


