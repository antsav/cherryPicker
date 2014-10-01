var Regex = function (name, sample, regexes) {
    this.name       = name;
    this.sample     = sample;
    this.regexes    = regexes;
}

var list = [];

list.push( new Regex(
    'JavaScript Functions',
    'function myFunc(a,b){ ... }',
    ['<script.*src="(.+)".*</script>']
));


module.exports.list = list;