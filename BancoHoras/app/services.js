angular.module("BancoHoras")

  .service("BancoHorasAPI", ['$http', 'WebAPIAddress', function ($http, WebAPIAddress, $rootscope) {
    var self = this;
    self.isLogged = false;
    self.authToken = "";

    self.auth = function () {

    };

    self.getEmployeeList = function () {

    };

    self.getEmployee = function () {

    };

    self.getEntryList = function () {

    };

    self.getEmployeeEntries = function () {

    };

    self.mockRequest = function (data, onFinish, delay) {
      setTimeout(() => {
        console.log(`Data ${data} finished processing`);
        onFinish();
      }, delay | 1500);
    };

    return {
      mockRequest: self.mockRequest,

      //GET requests
      getEmployeeList : self.getEmployeeList,
      getEmployee: self.getEmployee,
      getEntryList: self.getEntryList,
      getEmployeeEntries: self.getEmployeeEntries

      //POST requests

      //UPDATE requests

      //DELETE requests
    }
  }])

  .service("WebAPIAuth", [function () {
    this.isAuth = false;
    return {
      auth: function() {
        console.log('Authenticated');
        this.isAuth = true;
      },
      checkAuth: function () {
        return this.isAuth;
      }
    }
  }])

  .factory("WebAPIAddress", [function () {
    var domainRoute = 'http://localhost:5000';
    var employeeRoute = '/employee';
    var entryRoute = '/entries'
    return {
      domain: domainRoute,
      employee: domainRoute + employeeRoute,
      entry: domainRoute + employeeRoute + entryRoute
    };
  }]);
