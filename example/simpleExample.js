(function() {
  (function(ng) {
    "use strict";
    var app;
    app = ng.module("demo", ["mkModal"]);
    return app.controller("demoCtrl", function($scope) {
      $scope.data = {
        modalData: {
          effect: "mkmd-effect-susab",
          style: {
            height: "80%",
            width: "100%"
          }
        }
      };
    });
  })(angular);

}).call(this);
