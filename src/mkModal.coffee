angular.module("mkModal", []).directive "mkModal", () ->

  return {
    restrict: "E"
    transclude: true
    scope:
      triggerElementId: "@"
      closeElementId: "@"
      data: "="
      test: "="
    template: """{html}"""

    link: (scope, element, attrs) ->

      scope.oldEffect = null

      removeModalHandler = () ->

        $modal.removeClass("mkmd-show")
        $(document.documentElement).removeClass("md-perspective") if scope.isWithPerspective

      setEffect = (newEffect) ->

        $modal.removeClass(scope.oldEffect) if scope.oldEffect
        scope.oldEffect = newEffect
        $modal.addClass(newEffect)

      setStyle = (effect, style) ->

        cssObj =
          height: style.height
          width: style.width
          left: style.left

        switch effect
          when "mkmd-effect-sdsat" then break
          when "mkmd-effect-susab" then $modal.removeClass("mkmd-modal-basic-y")
          else
            $modal.addClass("mkmd-modal-basic-y")
            cssObj.top = style.top

        $modal.css(cssObj)

      init = (data) ->

        if data.effect
          setEffect(data.effect)

        if data.style
          setStyle(data.effect, data.style)

      $overlay = $(".mkmd-overlay")
      $element = $("#" + scope.triggerElementId)
      $modal = $("#mkmd")
      $closeBtn = $modal.find("#" + scope.closeElementId)



      init(scope.data)

      scope.$watch "data", (newValue, oldValue) ->
        return if newValue is oldValue
        init(newValue)
      , true



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
