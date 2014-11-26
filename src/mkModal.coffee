angular.module("mkModal", []).directive "mkModal", () ->

  return {
    restrict: "E"
    transclude: true
    scope:
      triggerElementId: "@"
      closeElementId: "@"
      height: "="
    template: """{html}"""

    link: (scope, element, attrs) ->

      $overlay = $(".mkmd-overlay")
      $element = $("#" + scope.triggerElementId)
      $modal = $("#mkmd")
      $modal.css(height: scope.height + "px")
      $closeBtn = $modal.find("#" + scope.closeElementId)

      removeModalHandler = () ->

        $modal.removeClass("mkmd-show")

      $element.on("click", (el) ->

        $modal.addClass("mkmd-show")

        $overlay.off("click", removeModalHandler)
        $overlay.on("click", removeModalHandler)
      )

      $closeBtn.on("click", (el) ->
        el.stopPropagation()
        removeModalHandler()
      )
  }
