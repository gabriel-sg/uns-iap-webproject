<html lang="en">
    <head>
        <meta charset="UTF-8">
        {{-- Let browser know website is optimized for mobile --}}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        {{-- Bootstrap: Compiled and minified CSS --}}
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        {{-- Materialize:
            {{-- Import Google Icon Font --}}
            {{-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> --}}
            {{-- Compiled and minified CSS --}}
            {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> --}}

            <title>@yield('title')</title>
    </head>
    <body>
        {{-- Materialize Nav --}}
        {{-- <nav class="light-blue lighten-1" role="navigation">
            <div class="nav-wrapper container">
                <a href="#" class="brand-logo">Logo</a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="https://laravel.com/docs/5.7/" target="_blank">Laravel Docs</a></li>
                    <li><a href="http://www.cs.uns.edu.ar/~mlg/iap/" target="_blank">IAP</a></li>
                </ul>
                <ul id="nav-mobile" class="sidenav">
                    <li><a href="https://laravel.com/docs/5.7/" target="_blank">Laravel Docs</a></li>
                    <li><a href="http://www.cs.uns.edu.ar/~mlg/iap/" target="_blank">IAP</a></li>
                </ul>
                <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            </div>
        </nav> --}}

        <div class="container">
            @yield('content')
        </div>

        {{-- Materialize --}}
        <!--JavaScript at end of body for optimized loading-->
        <!-- Compiled and minified JavaScript -->
            {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> --}}
        {{-- Activate mobile navbar plugin --}}
            {{-- <script language="javascript">
                document.addEventListener('DOMContentLoaded', function() {
                    var elems = document.querySelectorAll('.sidenav');
                    var instances = M.Sidenav.init(elems);
                });
            </script> --}}
    </body>
</html>
