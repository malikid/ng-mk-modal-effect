((ng) ->
  "use strict"
  app = ng.module("demo", ["mkModal"])
  app.controller "demoCtrl", ($scope) ->

    $scope.data =
      modalData:
        effect: "mkmd-effect-susab"
        style:
          height: "80%"
          width: "100%"

    return

) angular
