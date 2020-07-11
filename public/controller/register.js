app.controller('controllerRegistro', function ($scope, $http, $location) {

            $scope.form = {};
            $scope.error = null;


            $scope.enviar = function () {


                        $http({
                            method: "POST",
                            url: "./auth/register",
                            data: $scope.form

                        }).then(function (response) {

                            $scope.error = "";
                            if (response.data.status === true) {

                                swal({
                                    title: "Usuario Agregado",
                                    icon: "success",
                                    button: "Cerrar",
                                });

                                window.location.href = "./";
                            } else {

                                swal({
                                    title: "ocurrio un error",
                                    text: "ya existe datos de este usuario",
                                    icon: "error",
                                    button: "Cerrar",
                                });

                            }

                        }).catch(function (error) {
                            console.log(error);

                        })

                    }





            });
