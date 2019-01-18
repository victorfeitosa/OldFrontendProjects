(function () {
  'use strict';

  angular
    .module('BancoHoras')
    .directive('profilePic', profilePic);

  profilePic.inject = [''];
  function profilePic() {
    var directive = {
      bindToController: {
        src: '@',
        overlayElement: '=',
        alt: '=?',
        click: '&?'
      },
      controller: profilePicCtrl,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      templateUrl: 'app/directives/profilepic.html',
      scope: {
        src: '@'
      },
    };
    return directive;

    function link(scope, element, attrs, vm) {

      var profileImage = element.find('img');
      profileImage.mouseover(function () {
        var overelem = angular.element('<i id="overlay" class="glyphicon glyphicon-camera profile-image-overlay"></i>');
        //darken blur image
        profileImage.css('filter', 'blur(4px) brightness(70%)');
        //appends overlay
        element.append(overelem);
        // //puts overlay half-way top-left
        var ovX = this.offsetWidth / 2 - overelem.width() / 5;
        var ovY = this.offsetHeight / 2 - overelem.height() / 2;
        overelem.css('left', ovX);
        overelem.css('top', ovY);
      });
      profileImage.mouseout(function () {
        var profileImage = angular.element(this);
        //unblur and brighten image
        profileImage.css('filter', 'blur(0px) brightness(100%');
        //remove overlay
        angular.element('#overlay').remove();
      });
      profileImage.click(function () {
        vm.click();
        var fileUpload = angular.element('#fileUpload');
        fileUpload.change(function(e) {
          console.log('Uploading file: ', fileUpload[0].files[0]);
        });
        fileUpload.click();
      });
    }
  }
  /* @ngInject */
  function profilePicCtrl() {
    var self = this;

    self.alt = 'Change Profile Picture';
    self.click = function () {
      console.log('Image Clicked');
    };
  }
})();