<!DOCTYPE html>
<html lang="en" ng-app="app">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>informacion</title>
    <!-- CSS only -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />

    <link rel="stylesheet" href="../style/info.css" />

    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>


    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>


    <link rel="stylesheet" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" />
    <script src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="//cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>



    <script>
        var id_usuario = <?php print $_SESSION['user'][0]->id_users ?>;
        var id_roles= <?php print $_SESSION['user'][0]->id_roles ?>;
    </script>

</head>

<body ng-controller="controllerInformacion" ng-cloak>



    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">

            Pharmasan - <span ng-if="role == '1'"> Administrador</span> <span ng-if="role == '2'"> Vendedor</span>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item " ng-if="role == '1'">
        <a class="nav-link" href="/api/usuarios">usuarios <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/api/clientes">clientes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/api/reporte">reporte</a>
      </li>

    </ul>
  </div>


        <a class="btn btn-outline-success my-2 my-sm-0 " href="./salir" tabindex="-1" aria-disabled="true">Salir</a>

    </nav>

    <div class="info-fondo">
        <div class="container">
            <div class="info-center">
                <div class="row">
                    <div class="col-lg-12">

                        <table id="TableInfo" class="table table-striped table-bordered table-hover table-condensed">
                        </table>


                    </div>
                </div>
            </div>

            <div class="row" ng-if="active_form">

                <div class="col-lg-12">

                    <div class="card text-center">
                        <div class="card-header">
                            {{title_form}}
                        </div>

                        <div class="card-body">

                            <form id="guardar" ng-submit="enviar(tipo_envio)">

                                <div class="form-group">
                                    <label for="exampleInputNombre">Nombres</label>
                                    <input type="text" class="form-control" id="exampleInputNombre"
                                        ng-model="form.nombre" required>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1"
                                        ng-model="form.email" required>
                                </div>


                                <div class="form-group">
                                    <label for="exampleInputDireccion">Direccion</label>
                                    <input type="text" class="form-control" id="exampleInputDireccion"
                                        ng-model="form.direccion" required>
                                </div>




                                <div class="row">
                                    <div class="col-lg-6">
                                        <button type="button" class="btn btn-secondary  btn-lg btn-block"
                                            ng-click="cancelar()">Cancelar</button>
                                    </div>
                                    <div class="col-lg-6">
                                        <button type="submit" class="btn btn-primary btn-lg btn-block">Enviar</button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>

                </div>



            </div>
        </div>










</body>

<script src="../controller/app.js"></script>
<script src="../controller/informacion.js"></script>

</html>
