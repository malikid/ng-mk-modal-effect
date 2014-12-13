((ng) ->
  "use strict"
  app = ng.module("demo", ["mkModal"])
  app.controller "demoCtrl", ($scope) ->

    $scope.isInit = true

    $scope.effects_1 = [{
      name: "Fade In and Scale Up",
      value: "fi"
    }, {
      name: "Slide from the Right",
      value: "sl"
    }, {
      name: "Slide from the Bottom",
      value: "su"
    }, {
      name: "Slide Down and Stick At Top",
      value: "sdsat"
    }, {
      name: "Slide Up and Stick At Bottom",
      value: "susab"
    }, {
      name: "Newspaper",
      value: "n"
    }, {
      name: "Fall",
      value: "f"
    }, {
      name: "Side Fall",
      value: "sf"
    }]

    $scope.effects_2 = [{
      name: "Stand Out",
      value: "so"
    }, {
      name: "Super Scaled",
      value: "ss"
    }, {
      name: "Just Me",
      value: "jm"
    }, {
      name: "3D Flip Horizontal",
      value: "3dfh"
    }, {
      name: "3D Flip Vertical",
      value: "3dfv"
    }, {
      name: "3D Sign",
      value: "3dsign"
    }, {
      name: "3D Slit",
      value: "3dslit"
    }, {
      name: "3D Rotate from Bottom",
      value: "3dru"
    }, {
      name: "3D Rotate in from Left",
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
      
      if $scope.isInit
        $scope.isInit = false
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

    $scope.modalClosedHandler = () ->

      statusText = $("#statusText")[0]
      statusText.innerHTML = "Modal Closed!"
      setTimeout () ->
        statusText.innerHTML = ""
      , 2000



    return

) angular
