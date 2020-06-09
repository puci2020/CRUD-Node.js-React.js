const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const riverRoutes = express.Router();
const PORT = 8080;

let River = require('./river.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/rivers', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

riverRoutes.route('/').get(function (req, res) {
    River.find(function (err, rivers) {
        if (err) {
            console.log(err);
        } else {
            res.json(rivers);
        }
    })
});

riverRoutes.route('/:id').get(function (req, res) {
    let id = req.param.id;
    River.findById(id, function (err, river) {
        res.json(river);
    })
});

riverRoutes.route('/add').post(function (req, res) {
    let river = new River(req.body);
    river.save()
        .then(river => {
            res.status(200).json({'river': 'river addes successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new river failed');
        })
});

riverRoutes.route('/update/:id').post(function (req, res) {
    River.findById(req.params.id, function (err, river) {
        if (!river) {
            res.status(404).send("data is no found");
        } else {
            river.river_name = req.body.river_name;
            river.river_length = req.body.river_length;
            river.river_depth = req.body.river_depth;

            river.save()
                .then(river => {
                    res.json('River updated');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

riverRoutes.route('/:id').delete(function (req, res) {
    River.findById(req.params.id, function (err, river) {
        if (!river) {
            res.status(404).send("data is no found");
        } else {
            river.delete()
                .then(river => {
                    res.json('River removed');
                })
                .catch(err => {
                    res.status(400).send("Remove not possible");
                });
        }
    });
});

app.use('/rivers', riverRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
