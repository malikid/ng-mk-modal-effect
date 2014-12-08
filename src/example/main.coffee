((ng) ->
  "use strict"
  app = ng.module("demo", ["mkModal"])
  app.controller "demoCtrl", ($scope) ->

    $scope.effects_1 = [{
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
    }]

    $scope.effects_2 = [{
      name: "Stand Out",
      value: "so"
    }, {
      name: "Super scaled",
      value: "ss"
    }, {
      name: "Just me",
      value: "jm"
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
      name: "3D slit",
      value: "3dslit"
    }, {
      name: "3D Rotate from bottom",
      value: "3dru"
    }, {
      name: "3D Rotate in from left",
      value: "3drr"
    }]

    $scope.resetStyle = () ->
      style = $scope.data.modalData.style
      if $scope.data.effectType is "so"
        testContainer = $("#soContainer")
        style.height = testContainer.height()
        style.width = testContainer.width()
        style.top = testContainer.offset().top + style.height / 2
        style.left = testContainer.offset().left + style.width / 2
      else
        style.height = "auto"
        style.width = "70%"
        style.top = "50%"
        style.left = "50%"
      $scope.$apply()

    $scope.setModalData = () ->
      $scope.data.modalData.effect = "mkmd-effect-" + $scope.data.effectType
      $scope.resetStyle()

    $scope.data =
      effectType: "so"
      modalData:
        effect: "mkmd-effect-so"
        style:
          height: "auto"
          width: "70%"

    angular.element(document).ready () ->
      $scope.setModalData()

    return

) angular
