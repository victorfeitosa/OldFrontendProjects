/**
 * Módulo principal de Banco de Horas. Responsável por gerenciar toda a aplicação, seus controladores e serviços
 * @class BancoHoras
 */
var BancoHoras = angular.module('BancoHoras', ['ui.router', 'ngAnimate', 'ui.bootstrap'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      /**
       * State de login, com template da view e controller
       * @private
       */
      .state('login', {
        url: "/",
        views: {
          'headerView': {
            templateUrl: "www/templates/loginHeader.html",
            controller: "LoginHeaderCtrl as hvm"
          },
          'mainView': {
            templateUrl: "www/templates/loginMain.html",
            controller: "LoginMainCtrl as vm"
          }
        }
      }) //end of 'login' state
      /**
       * State da dashboard de cliente
       * @private
       */
      .state('dashboard', {
        url: "/dashboard",
        views: {
          'headerView': {
            templateUrl: "www/templates/dashboardHeader.html",
            controller: "DashboardHeaderCtrl as hvm"
          },
          'mainView': {
            templateUrl: "www/templates/dashboardMain.html",
            controller: "DashboardMainCtrl as vm"
          }
        }
      })
      //TODO: setup this state properly
      /**
       * Dashboard de administradores
       * @private
       */
      .state('admin', {
        url: "/admin",
        views: {
          'headerView': {
            templateUrl: "www/templates/dashboardHeaderAdmin.html",
            controller: "AdminHeaderCtrl as hvm"
          },
          'mainView': {
            templateUrl: "www/templates/dashboardMainAdmin.html",
            controller: "AdminMainCtrl as vm"
          }
        },
        resolve: {
          data: function(WebAPIAuth) {
            console.log(WebAPIAuth);
            if(WebAPIAuth.isAuth) {
              console.log('OK');
            }
            else {
              console.log('Authenticating');
              WebAPIAuth.auth();
            }
          }
        }
      })
      //TODO: setup this state properly
      /**
       * Dashboard de administradores
       * @private
       */
      .state('admin-employees', {
        url: "/admin/employees",
        views: {
          'headerView': {
            templateUrl: "www/templates/dashboardHeaderAdmin.html",
            controller: "AdminHeaderCtrl as hvm"
          },
          'mainView': {
            templateUrl: "www/templates/dashboardMainAdminEmployees.html",
            controller: "AdminMainEmployeesCtrl as vm"
          }
        }
      })
      //TODO: setup this state properly
      /**
       * Dashboard de administradores
       * @private
       */
      .state('admin-alerts', {
        url: "/admin/alerts",
        views: {
          'headerView': {
            templateUrl: "www/templates/dashboardHeaderAdmin.html",
            controller: "AdminHeaderCtrl as hvm"
          },
          'mainView': {
            templateUrl: "www/templates/dashboardMainAdminAlerts.html",
            controller: "AdminMainAlertsCtrl as vm"
          }
        }
      })
      /**
       * State de registro de usuários
       * @private
       */
      .state('register', {
        url: "/register",
        views: {
          'headerView': {
            templateUrl: "www/templates/loginHeader.html",
            controller: "LoginHeaderCtrl as hvm"
          },
          'mainView': {
            templateUrl: "www/templates/registerMain.html",
            controller: "RegisterMainCtrl as vm"
          }
        }
      });
  });