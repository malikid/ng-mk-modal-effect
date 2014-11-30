((ng) ->
  "use strict"
  app = ng.module("demo", ["mkModal"])
  app.controller "demoCtrl", ($scope) ->

    $scope.effects = [{
      name: "Slide up stick at bottom",
      value: "susab"
    }, {
      name: "Fade in and scale up",
      value: "fi"
    }, {
      name: "Slide from the right slide-left",
      value: "sl"
    }, {
      name: "Slide from the bottom slide-up",
      value: "su"
    }, {
      name: "Newspaper",
      value: "n"
    }, {
      name: "Fall",
      value: "f"
    }, {
      name: "Side fall",
      value: "sf"
    }, {
      name: "Slide down and stick at top",
      value: "sdsat"
    }, {
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
      name: "3D Rotate from bottom 3d-rotate-up",
      value: "3dru"
    }, {
      name: "3D Rotate in from left 3d-rotate-right",
      value: "3drr"
    }]

    $scope.setModalData = () ->
      $scope.data.modalData.effect = "mkmd-effect-" + $scope.data.effectType

    $scope.data =
      effectType: "fi"
      modalData:
        effect: "mkmd-effect-fi"
        style:
          height: "70%"
          width: "100%"

    return

) angular
