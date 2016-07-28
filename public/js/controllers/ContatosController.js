
angular.module('contatooh').controller('ContatosController',
function ($scope, Contato) {

    $scope.mensagem = { texto: '' };
    $scope.incrementa = function () {
        $scope.total++;
    };

    function buscaContatos() {
        Contato.query(
            function (data) {
                $scope.contatos = data;
                //$scope.total = $scope.contatos.length
                MostraMensagem();
            }
            , function (statusText) {
                console.log(statusText);
                MostraMensagem("Ocorreu um erro ao tentar recuperar os contatos!")
            });
    }

    buscaContatos();

    $scope.remover = function (contato) {
        //$http.delete('/Contatos') 
        Contato.delete({ id: contato._id },
                buscaContatos(),
            function (error) {
                console.log(error);
                MostraMensagem("Ocorreu um erro ao tentar excluir o contato!");
            });
    }

    function MostraMensagem(texto) {
        $scope.mensagem.texto = texto;
    }

    $scope.filter = '';
});