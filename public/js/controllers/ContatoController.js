angular.module('contatooh').controller('ContatoController',
    function ($scope, Contato, $routeParams) {
        var idContato = $routeParams.contatoId;
        $scope.mensagem = {texto:''};
        function buscaContato() {
            if (idContato)
                Contato.get({ id: idContato },
                    function (data) {
                        $scope.contato = data;
                    },
                    function (erro) {
                        console.log(erro);
                    });
            else
                $scope.contato = new Contato();
        }

        $scope.salvar = function () {
            $scope.contato.$save();
            $scope.mensagem.texto = 'Contato Salvo com sucesso!';
            $scope.$broadcast('contatoSalvo');
            //setTimeout(function () {
            //    window.location.href = '#/contatos'
            //},
            //    10000);
        }

        buscaContato();
        Contato.query(function (contatos) {
            $scope.contatos = contatos;
        });
    });