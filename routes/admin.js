var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var flowers = require('../modules/models/flowers');
var multiparty = require('multiparty');

/* GET admin page. */
router.get('/', function (req, res, next) {
    flowers.find({}, function (err, items) {
        flowers.find({}, function (err, flowers) {
            res.render('admin', {'category': items, 'flowers': flowers});
        });
    });
});

/**
 * Remove current item in the category
 *
 *
 */
router.get('/remove', function (req, res, next) {
    var category = req.query.category;
    var root = path.parse(__dirname).dir + '/public';

    fs.unlink(root + req.query.link, (err)=> {
        if (err) {
             console.log("No file -" + root + req.query.link + ". Please change the name of file")
        } else {
            console.log('successfully deleted ' + req.query.link);
        }
    })

    flowers.findOne({name: category}, {}, function (err, category) {
        if (err) return next(err);
        for ( var i = 0; i < category.list.length; i++ ) {
            if (category.list[i][0] === req.query.link) {
                category.list.splice(i, 1);
            }
        }
        //http://mongoosejs.com/docs/faq.html не обновляет массив без этого
        category.markModified('list');
        category.save((error, updatedItem) => {
            if (error) {
                return res.status(400).json({message: error.message})
            } else {
                return res.json({message: "Категория успешно удалена"})
            }
        })
    });
});

/*
* Create new category
 */

router.post('/newCategory', function (req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({error: err.message || err})

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

        item.save().then(work => {
            var pictures = fields.file.filter(f => f.size).map((file, key) => {
                var newFilePath = path.join('upload', `${work._id}_${key}${path.extname(file.path)}`);
                fs.writeFileSync(path.resolve(config.http.publicRoot, newFilePath), fs.readFileSync(file.path));

                return newFilePath;
            });

            return Model.update({_id: work._id}, { $pushAll: { pictures: pictures } });
        }, e => {
            throw new Error(Object.keys(e.errors).map(key => e.errors[key].message).join(', '));
        }).then(
            i => res.json({ message: "Запись успешно добавлена"}),
            e => res.json({ error: e.message})
        );
    });
    // console.log(req.query.avatar + "  " + req.query.name);
});

module.exports = router;
