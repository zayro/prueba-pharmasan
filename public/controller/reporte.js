
app.controller('controllerInformacion', function ($scope, $http, $location) {

    $scope.role = id_roles;

    $scope.select = function () {

        if ($.fn.dataTable.isDataTable('#TableInfo')) {
            console.log('se cargo');
        } else {
            console.log('cargando');
        }

        $scope.table_user = $('#TableInfo').DataTable({

            ajax: 'pharmasan/all/view_medicamentos/',
            deferRender: true,
            columns: [
                {
                    data: 'expediente',
                    title: 'expediente'
                },
                {
                    data: 'producto',
                    title: 'producto'
                },
                {
                    data: 'titular',
                    title: 'titular'
                },
                {
                    data: 'titular',
                    title: 'titular'
                },
                {
                    data: 'registrosanitario',
                    title: 'registrosanitario'
                },

            ]


        });
    };

    $scope.select_load_tabler = function () {
        $scope.table_user.ajax.url('pharmasan/all/clientes').load();
    };



    $scope.crear = function () {



            const send = {
                "insert": "clientes",
                "values": [$scope.form]
            };


            $http({
                method: "POST",
                url: "./pharmasan/createAutoincrement",
                data: send

            }).then(function (reponse) {
                console.log(reponse);
                if (reponse.data.status === true) {

                    swal({
                        title: "Registro Creado",
                        icon: "success",
                        button: "Cerrar",
                    });

                    $scope.select_load_tabler();

                    $scope.active_form = false;

                    $scope.form = {};

                } else {
                    swal({
                        title: "Ocurrio un problema",
                        text: 'identificacion ya existe',
                        icon: "error",
                        button: "Cerrar",
                    });
                }

            });




    }

    $scope.eliminar = function (id) {


        const send = {
            delete: "clientes",
            where: {
                "id_clientes": id
            }
        }

        $http({
            method: "post",
            url: "./pharmasan/destroy",
            data: send

        }).then(function (reponse) {
            console.log(reponse);
            if (reponse.data.status === true) {

                swal({
                    title: "Registro Eliminado",
                    icon: "success",
                    button: "Cerrar",
                });

                $scope.select_load_tabler();

            }

        });



    }

    $scope.actualizar = function () {

        const id = $scope.form.id_clientes;
        delete $scope.form.id_clientes;


        const send = {
            update: "clientes",
            set: $scope.form,
            where: {
                "id_clientes": id
            }
        }

        $http({
            method: "put",
            url: "./pharmasan/edit",
            data: send

        }).then(function (reponse) {
            console.log(reponse);
            if (reponse.data.status === true) {

                swal({
                    title: "Registro Actualizado",
                    icon: "success",
                    button: "Cerrar",
                });

                $scope.select_load_tabler();

                $scope.active_form = false;

                $scope.form = {};

            }

        });



    }


    $scope.select();

});
