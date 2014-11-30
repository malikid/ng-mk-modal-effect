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
      scope.isWithPerspective = false

      checkWithPerspective = (effect) ->

        switch effect
          when "mkmd-effect-sup", "mkmd-effect-slp", "mkmd-effect-sdp" then return true
          else return false

      removeModalHandler = () ->

        $modal.removeClass("mkmd-show")
        $(document.documentElement).removeClass("md-perspective") if scope.isWithPerspective

      setEffect = (newEffect) ->

        $modal.removeClass(scope.oldEffect) if scope.oldEffect
        scope.oldEffect = newEffect
        $modal.addClass(newEffect)
        scope.isWithPerspective = checkWithPerspective(newEffect)

      init = (data) ->

        if data.effect
          setEffect(data.effect)

        if data.style
          $modal.css({height: data.style.height, width: data.style.width})

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

        if scope.isWithPerspective
          setTimeout () ->
            $(document.documentElement).addClass("md-perspective")
          , 25
      )

      $closeBtn.on("click", (el) ->
        el.stopPropagation()
        removeModalHandler()
      )
  }
