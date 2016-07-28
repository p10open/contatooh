var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
//var id = new ObjectID();

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh', function (erro, db) {
    if (erro) throw err;
    db.collection('contatos').findOne({nome:/paulo/i}, function (erro, contato) {
        if (erro) throw err;
        console.log(contato);
    });
});