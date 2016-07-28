var mongoose = require("mongoose");

module.exports = function (uri) {
    //mongoose.connect(uri, { server: { poolSize: 10 } });
    mongoose.connect(uri);
    //mongoose.set('debug', true);
    mongoose.connection.on('connected', function () {
        console.log('Conectado em'+uri);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Desconectado de ' + uri);
    });
    mongoose.connection.on('error', function () {
        console.log('Erro na conexão' + uri);
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Conexão fechada devido o término da aplicação');
            process.exit(0);
        });
    });
}