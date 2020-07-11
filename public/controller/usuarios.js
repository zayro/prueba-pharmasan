
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

            ajax: 'pharmasan/all/vista_usuario/',
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
                    data: 'username',
                    title: 'user'
                },
                {
                    data: 'email',
                    title: 'email'
                },
                {
                    data: 'nombre',
                    title: 'rol'
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
                    $scope.form.username = data.username;
                    $scope.form.email = data.email;
                    $scope.form.password = data.password;
                    $scope.form.id_roles = data.id_roles;
                    $scope.form.id_users = data.id_users;


                    $scope.$apply();
                });

                $('button.delete', row).bind('click', () => {
                    $scope.eliminar(data.id_users);
                });

                return row;

            }

        });
    };

    $scope.select_load_tabler = function () {
        $scope.table_user.ajax.url('pharmasan/all/vista_usuario/').load();
    };



    $scope.crear = function () {

        if($scope.form.password === ''){
            delete  $scope.form.password;
        }




            $http({
                method: "POST",
                url: "./auth/register",
                data: $scope.form

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
            delete: "users",
            where: {
                "id_users": id
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


        $http({
            method: "put",
            url: "./auth/actualizarUsuario",
            data: $scope.form

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
