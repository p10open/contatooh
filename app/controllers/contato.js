//var contatos = [
//{
//    _id: 1, nome: 'Contato Exemplo 1',
//    email: 'cont1@empresa.com.br'
//},
//{
//    _id: 2, nome: 'Contato Exemplo 2',
//    email: 'cont2@empresa.com.br'
//},
//{
//    _id: 3, nome: 'Contato Exemplo 3',
//    email: 'cont3@empresa.com.br'
//}
//];

//ID_CONTATO_INC = 3;
var sanitize = require('mongo-sanitize');

module.exports = function (app) {

    var Contato = app.models.contato;

    var controller = {};
    controller.listaContatos = function (req, res) {
        Contato.find().populate("emergencia").exec().then(function (contatos) {
            res.json(contatos);
        }, function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
    };

    controller.obtemContato = function (req, res) {
        var idContato = sanitize(req.params.id);
        //var contato = contatos.filter(function (contato)
        //{
        //    if (contato._id == idContato)
        //        return contato;
        //})[0];
        var contato = Contato.findById(idContato).exec()
            .then(function (contato) {
                if (!contato) throw new Error("Contato não encontrado");
                res.json(contato);
            },
            function (erro) {
                res.status(404).json(erro);
            });
    };

    controller.removeContato = function (req, res) {
        var idContato = sanitize(req.params.id);
        //contatos = contatos.filter(function (contato) {
        //    if (contato._id != idContato)
        //        return contato;
        //});
        //res.status(204).end()
        Contato.remove({ "_id": idContato }).exec()
            .then(function () {
                res.status(204).end();
            },
            function (erro) {
                console.error(erro);
            });
    };

    controller.salvaContato = function (req, res) {
        //var contatoNew = req.body;
        
        var id = sanitize(req.body._id);

        var contatoNew = {
            "nome": req.body.nome,
            "email": req.body.email,
            "emergencia": req.body.emergencia || null
        };
        
        if (id) {
            //contatos = contatos.map(function (contato) {
            //    if (contato._id == contatoNew._id)
            //        contato = contatoNew;
            //    return contato;
            //});
            Contato.findByIdAndUpdate(id, contatoNew).exec()
                .then(function (contato)
                {
                    res.json(contato);
                }, function (erro)
                {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
        else {
            //contatos.push(contatoNew);
            Contato.create(contatoNew)
                .then(function (contato) {
                    res.json(contato);
                }, function (erro)
                {
                    console.error(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
}