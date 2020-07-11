app.controller('controllerLogin', function ($scope, $http, $location) {


    $scope.form = {};

    $scope.enviar = function () {


        $http({
            method: "POST",
            url: "./auth/login",
            data: $scope.form

        }).then(function (reponse) {
            console.log(reponse);
            if (reponse.data.status === true) {


                swal({
                    title: "Authenticacion exitosa",
                    icon: "success",
                    button: "Cerrar",
                });

                if(reponse.data.result[0].id_roles == '1'){
                    window.location.href = "./api/usuarios";
                }

                if(reponse.data.result[0].id_roles == '2'){
                    window.location.href = "./api/clientes";
                }


            } else {

                swal({
                    title: "Ocurrio un problema",
                    text: "verificar las credencias de auntenticacion",
                    icon: "error",
                    button: "Cerrar",
                });
            }

        }).catch(function (response) {
            swal({
                title: "Ocurrio un problema",
                text: "verificar las credencias de auntenticacion",
                icon: "error",
                button: "Cerrar",
            });
        });


        console.log($scope.form);
    }




});


