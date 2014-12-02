(function() {
  (function(ng) {
    "use strict";
    var app;
    app = ng.module("demo", ["mkModal"]);
    return app.controller("demoCtrl", function($scope) {
      $scope.effects_1 = [
        {
          name: "Fade in and scale up",
          value: "fi"
        }, {
          name: "Slide from the right",
          value: "sl"
        }, {
          name: "Slide from the bottom",
          value: "su"
        }, {
          name: "Slide down and stick at top",
          value: "sdsat"
        }, {
          name: "Slide up and stick at bottom",
          value: "susab"
        }, {
          name: "Newspaper",
          value: "n"
        }, {
          name: "Fall",
          value: "f"
        }, {
          name: "Side fall",
          value: "sf"
        }
      ];
      $scope.effects_2 = [
        {
          name: "3D flip horizontal",
          value: "3dfh"
        }, {
          name: "3D flip vertical",
          value: "3dfv"
        }, {
          name: "3D sign",
          value: "3dsign"
        }, {
          name: "Super scaled",
          value: "ss"
        }, {
          name: "Just me",
          value: "jm"
        }, {
          name: "3D slit",
          value: "3dslit"
        }, {
          name: "3D Rotate from bottom",
          value: "3dru"
        }, {
          name: "3D Rotate in from left",
          value: "3drr"
        }
      ];
      $scope.setModalData = function() {
        return $scope.data.modalData.effect = "mkmd-effect-" + $scope.data.effectType;
      };
      $scope.data = {
        effectType: "fi",
        modalData: {
          effect: "mkmd-effect-fi",
          style: {
            height: "auto",
            width: "70%"
          }
        }
      };
    });
  })(angular);

}).call(this);
