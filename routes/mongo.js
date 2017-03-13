var schema = new mongoose.Schema({
    name: String,
    img: String,
    link: String,
    description: String,
    list: Object
});


var Model = mongoose.model(fields.name, schema);
var item = new Model({
    name: fields.name
});