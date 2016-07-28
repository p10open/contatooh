var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var moongose = require('mongoose');

module.exports = function () {
    Usuario = moongose.model('Usuario');
    passport.use(new GitHubStrategy({
        clientID: '647f1c0fc4ad74504215',
        clientSecret: '2718579f45a249a3e1c1fb33ad13c0d67f0bae75',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
        { "login": profile.username },
        { "nome": profile.username },
        function (erro, usuario) {
            if (erro) {
                console.log(erro);
                return done(erro);
            }
            return done(null, usuario);
        });
    }));

    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
        .then(function (usuario) {
            done(null, usuario);
        });
    });
}