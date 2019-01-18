angular.module("BancoHoras")

  //TODO: implement this
  .controller('LoginHeaderCtrl', function ($rootScope) {
    var self = this;
    self.homeMenuList = [
      { name: "Registrar", link: "#", active: "" },
      { name: "Esqueci Minha Senha!", link: "#", active: "" }
    ];

    $rootScope.user = "Johson";
    $rootScope.auth = true;
  })
  
  //TODO: implelment this
  /**
   * Controlador de login, responsável por se comunicar com o serviço de autenticação e realizar o login de usuários
   * @implements {ngController}
   * @class LoginMainCtrl
   */
  .controller('LoginMainCtrl', function ($rootScope, $state, $uibModal, BancoHorasAPI) {
    var self = this;
    $rootScope.user = {};
    // TODO: Login with the web api
    self.userLogin = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: 'static',
        keyboard: false,
        windowClass: 'loader-bg',
        templateUrl: 'www/templates/loaderModal.html',
        size: 'sm'
      });
      BancoHorasAPI.mockRequest(self.userEmail, function() {
        modalInstance.close();
        $state.transitionTo('dashboard');
      }, 2000);
    };
  })

  /**
   * Controller de registro de usuários
   * @implements {ngController}
   * @class RegisterMainCtrl
   * */
  .controller('RegisterMainCtrl', function ($scope, $rootScope, $state) {
    let self = this;
    self.userPhoto = "/www/imgs/profile.jpg";

    self.pickUserImage = function () {
      //TODO: implement this
      alert("Selecionando imagem do usuário!");
    };

    self.register = function () {
      alert('Registered ' + self.firstName + ' ' + self.lastName + ' as a ' +
        self.function + ' ' + self.numberHours + 'h');
      $state.transitionTo('login');
    };
  })

  .controller('ConfigsModalCtrl', function($rootScope, $state, $uibModalInstance) {
    let self = this;

    self.user = $rootScope.user;

    self.close = function() {
      $uibModalInstance.dismiss();
    };

    self.save = function() {
      $rootScope.user = self.user;
      $uibModalInstance.close({
        result: 'OK'
      });
    };
  })
  
  .controller('AlertsModalCtrl', function($state, $rootScope, $uibModalInstance, userAlerts) {
    var self = this;
    self.alerts = userAlerts;

    self.removeAlert = function(alert) {
      self.alerts.splice(self.alerts.indexOf(alert), 1);
    };
    self.removeAllAlerts = function() {
      self.alerts.splice(0, self.alerts.length);
    };

    self.close = function() {
      $uibModalInstance.dismiss();
    };
    self.ok = function() {
      $uibModalInstance.close({
        result: 'OK'
      });
    };
  })

  .controller('DashboardHeaderCtrl', function ($state, $rootScope, $uibModal) {
    var self = this;

    self.userAlerts = [
      {
        date: new Date(),
        text: 'Cuidado para não ficar saindo muito tarde do trabalho',
        obs: 'Use melhor seu controle de ponto'
      },
      {
        date: new Date(),
        text: 'O PÊNIS precisa de cuidados',
        obs: 'Lave o pinto'
      },
      {
        date: new Date(),
        text: 'Cuidado para não ficar dizendo cuidado',
        obs: 'CUIDADO'
      },
      {
        date: new Date(),
        text: 'Falta não avisada na terça-feira',
        obs: 'Favor se dirija ao RH para corrigir isto'
      }
    ];
    self.modalInstance = null;

    self.logout = function () {
      $state.transitionTo('login');
    };

    self.configModal = function () {
      modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'www/templates/configureModal.html',
        size: 'lg',
        controller: 'ConfigsModalCtrl as mvm'
      });
    };
    self.alertsModal = function () {
      modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'www/templates/alertsModal.html',
        size: 'lg',
        controller: 'AlertsModalCtrl as hvm',
        resolve: {
          userAlerts: () => { return self.userAlerts; }
        }
      });
    };

  })
  .controller('DashboardMainCtrl', function ($rootScope, $uibModal, $http) {
    var self = this;

    //TODO: get auth service stuff
    if (!$rootScope.user) {
      $rootScope.user = {};
    }
    $rootScope.user.name = "Johnson";
    $rootScope.user.role = "Desenvolvedor CLT";
    $rootScope.user.photo = "www/imgs/profile.jpg";
    $rootScope.user.weeklyHours = "40";
    $rootScope.user.balanceHours = 0;

    self.user = $rootScope.user;
    self.btnAllEntries = false;
    self.btnViewAllText = 'Expandir entradas';
    self.totalStatus = "success";

    //entry pagination config
    //TODO: get number of entries from the service
    self.nulLimit = 10;
    self.currentPage = 1;
    self.numEntries = 0;
    self.initialEntry = 0;

    //TODO: get entries from the db
    self.bancoHoras = [];

    self.changePicture = function () {
      console.log('Changing Picture');
    };

    //page changing
    self.changePage = function () {
      self.initialEntry = (self.currentPage - 1) * self.numLimit;
    };

    //Entry removal
    self.removeEntry = function (element) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'www/templates/removeEntryModal.html',
        controller: function($scope) {
          $scope.remove = function() {
            $scope.$close(element);
          };
          $scope.cancel = function() {
            $scope.$dismiss('cancelled entry removal');
          };
        },
        size: 'sm'
      });

      modalInstance.result.then(function(item) {
        self.bancoHoras.splice(self.bancoHoras.indexOf(item), 1);
        //TODO: send notification to Admin
      }, function(reason) {
        console.log(reason);
      });
    };

    //calcula o saldo de horas
    self.checkBalance = function () {
      $rootScope.user.balanceHours = 0;
      for (var i in self.bancoHoras) {
        $rootScope.user.balanceHours += self.bancoHoras[i].quant;
      }

      if ($rootScope.user.balanceHours > 0)
        self.totalStatus = "success";
      else if ($rootScope.user.balanceHours === 0)
        self.totalStatus = "warning";
      else
        self.totalStatus = "danger";
    };

    //métodos do controlador--

    //abre modal de adição de horas
    self.overHour = function () {
      self.mdTitle = "Cumprir Hora Extra";
      self.mdMethod = "add";
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'www/templates/hourModal.html',
        controller: 'HourModalCtrl',
        size: 'lg',
        resolve: {
          mdTitle: function () { return self.mdTitle; },
          mdMethod: function () { return self.mdMethod; }
        }
      });

      modalInstance.result.then(
        function (result) {
          //insere nova entrada no começo do array
          self.bancoHoras.splice(0, 0, { date: result.date, reason: result.reason, quant: result.quant });
          console.log("Data: " + result.date + ", Horas: " + result.quant + ", Razão: " + result.reason);

          //atualiza saldo de horas
          self.checkBalance();
        }
      );
    };

    //abre modal de adição de faltas
    self.underHour = function () {
      self.mdTitle = "Adicionar Falta / Atraso";
      self.mdMethod = "sub";
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'www/templates/hourModal.html',
        controller: 'HourModalCtrl',
        size: 'lg',
        resolve: {
          mdTitle: function () { return self.mdTitle; },
          mdMethod: function () { return self.mdMethod; }
        },
        result: function(result) {

        }
      });

      modalInstance.result.then(
        function (result) {
          //TODO: pegar dados do servidor e atualizar quando voltar
          //insere nova entrada no começo do array
          self.bancoHoras.splice(0, 0, { date: result.date, reason: result.reason, quant: -result.quant });

          //atualiza saldo de horas
          self.checkBalance();
        }
      );
    };

    //inicializa saldo de horas
    self.checkBalance();
  })
  .controller('AdminHeaderCtrl', function () {
    var self = this;
  })
  .controller('AdminMainCtrl', function ($rootScope) {
    var self = this;

    self.bancoHorasTotal = [
      {date: new Date(), name: 'Edgar Alan Poe', reason: 'Drunk and passed out', amount: '-2'},
      {date: new Date(), name: 'Orson Scottcard', reason: 'Hate speech', amount: '-4'},
      {date: new Date(), name: 'Howard Phillips Lovecraft', reason: 'Conjured the Abyss', amount: '2'},
      {date: new Date(), name: 'Stephen King', reason: 'Riding the Tutle', amount: '2'},
      {date: new Date(), name: 'Howard Phillips Lovecraft', reason: 'Swallowed by the Abyss', amount: '-2'},
      {date: new Date(), name: 'Edgar Alan Poe', reason: 'Drunk and passed out yet again', amount: '-3'},
    ];

    self.userName = 'HugoBoss';
    self.userPic = 'www/imgs/profile.jpg';
    self.balanceWeekHours = 30;
    self.totalStatus = self.balanceWeekHours > 0 ? 'success' : 'danger';
  })
  .controller('AdminMainEmployeesCtrl', function () {
    var self = this;
    console.log('EMPLOYEES');

    self.employees = [
      {name: 'Hasmond Dublinson', position: 'Jr Developer', hours: 40, total: 2},
      {name: 'Jorish Ar Jormanel', position: 'Senior Developer', hours: 40, total: -6},
      {name: 'Kettlas Kar Kerbal', position: 'Tester', hours: 30, total: -1},
      {name: 'Marismun Mon Cherri', position: 'Project Manager', hours: 44, total: 1},
      {name: 'Bitchars Von Semnotions', position: 'Jr Developer', hours: 30, total: 0},
      {name: 'Kengal Das Balada', position: 'Plain Developer', hours: 40, total: 1},
      {name: 'Dorismond Dorisgalera', position: 'Overseer', hours: 30, total: 0}
    ];
  })
  .controller('AdminMainAlertsCtrl', function ($uibModal) {
    var self = this;
    self.alerts = [
      {employee: 'Haroldson the Brave', description: 'Faltou 2h todo dia durante uma semana inteira', date: new Date()},
      {employee: 'Muriman Ahkrin', description: 'Tá de putaria comigo', date: new Date()},
      {employee: 'Arina Erina Mirina', description: 'Passou um dia inteiro cagando no banheiro', date: new Date()}
    ];

    self.openAlertSend = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'www/templates/dashboardMainAdminAlertModal.html',
        size: 'lg',
        controller: 'AlertSendCtrl as hvm'
      });
    }
  })

  .controller('AlertSendCtrl', function($rootScope, $uibModalInstance) {
    var self = this;

    self.ok = function() {
      $uibModalInstance.close({

      });
    };

    self.cancel = function() {
      $uibModalInstance.dismiss();
    };
  })

  .controller('HourModalCtrl', function ($scope, $rootScope, $uibModalInstance, mdTitle, mdMethod) {
    $scope.mdTitle = mdTitle;
    $scope.mdMethod = mdMethod;

    $scope.hourDate = new Date();
    $scope.hourReason = "";
    $scope.hourQuant = 0;

    $scope.close = function () {
      $uibModalInstance.dismiss('close or cancel');
    };
    $scope.ok = function () {
      //TODO: verificar todos os campos e a sua respectiva validade

      $uibModalInstance.close({ date: $scope.hourDate, quant: $scope.hourQuant, reason: $scope.hourReason });
    };
  });
