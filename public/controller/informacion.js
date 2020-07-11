
app.controller('controllerInformacion', function ($scope, $http, $location) {

    $scope.active_form = false;
    $scope.tipo_envio = null;
    $scope.form = {};

    $scope.role = id_roles;

    $scope.cancelar = function () {
        $scope.form = {};
        $scope.active_form = false;

    }

    $scope.toggle = function () {
        $scope.active_form = !$scope.active_form;
    };

    $scope.enviar = function (dato) {

        switch (dato) {
            case 'add':
                $scope.crear();
                break;
            case 'edit':
                $scope.actualizar();
                break;
            default:
                console.log('no se reconoce');
                break;
        }

    }

    $scope.select = function () {

        if ($.fn.dataTable.isDataTable('#TableInfo')) {
            console.log('se cargo');
        } else {
            console.log('cargando');
        }

        $scope.table_user = $('#TableInfo').DataTable({

            ajax: 'pharmasan/all/clientes/',
            deferRender: true,
            columns: [{
                    visible: true,
                    searchable: false,
                    render: function (data, type, full) {
                        return `
                        <div class="text-center">
                        <button class="btn btn-outline-primary btn-sm edit"><i  class="fa fa-edit"></i></button>
                        <button class="btn btn-outline-danger btn-sm delete"><i  class="fa fa-close"></i></button>
                        </div>
                        `;
                    }
                },
                {
                    data: 'nombre',
                    title: 'nombre'
                },
                {
                    data: 'email',
                    title: 'email'
                },
                {
                    data: 'direccion',
                    title: 'direccion'
                }
            ],
            dom: `<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>
            <'row'<'col-sm-12'tr>>
            <'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-4 text-center'l><'col-sm-12 col-md-4'p>>`,
            buttons: [{
                text: '<button class="btn btn-outline-secondary"> Agregar <i  class="fa fa-plus"></i> </button> ',
                className: 'btn btn-default btn-xs',
                action: function (dt) {
                    $scope.title_form = "Agregar";
                    $scope.tipo_envio = 'add';
                    $scope.active_form = !$scope.active_form;
                    $scope.form = {};
                    $scope.$apply();


                }
            }, ],
            rowCallback: function (row, data, index) {

                $('button.edit', row).bind('click', () => {
                    $scope.title_form = "Editar";
                    $scope.tipo_envio = 'edit';
                    $scope.active_form = true;
                    $scope.form.nombre = data.nombre;
                    $scope.form.email = data.email;
                    $scope.form.direccion = data.direccion;
                    $scope.form.id_clientes = data.id_clientes;

                    $scope.$apply();
                });

                $('button.delete', row).bind('click', () => {
                    $scope.eliminar(data.id_clientes);
                });

                return row;

            }

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
