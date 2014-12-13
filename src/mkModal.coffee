angular.module("mkModal", []).directive "mkModal", () ->

  return {
    restrict: "E"
    transclude: true
    scope:
      triggerElementId: "@"
      closeElementId: "@"
      data: "="
    template: """{html}"""

    link: (scope, element, attrs) ->

      scope.oldEffect = null

      addCloseBtnClickEvent = () ->

        $closeElement = $("#" + scope.closeElementId)

        $closeElement.on("click", (el) ->

          el.stopPropagation()
          removeModalHandler()
          
        )

      removeModalHandler = () ->

        scope.$modal.removeClass("mkmd-show")
        scope.$body.removeClass("modal-open")

      setEffect = (newEffect) ->

        scope.$modal.removeClass(scope.oldEffect) if scope.oldEffect
        scope.oldEffect = newEffect
        scope.$modal.addClass(newEffect)

      setStyle = (effect, style) ->

        cssObj =
          height: style.height
          width: style.width
          left: style.left

        switch effect
          when "mkmd-effect-sdsat" then break
          when "mkmd-effect-susab" then scope.$modal.removeClass("mkmd-modal-basic-y")
          else
            scope.$modal.addClass("mkmd-modal-basic-y")
            cssObj.top = style.top

        scope.$modal.css(cssObj)

      init = (data) ->

        if data.effect
          setEffect(data.effect)

        if data.style
          setStyle(data.effect, data.style)

        addCloseBtnClickEvent()



      angular.element(document).ready () ->

        $overlay = $(".mkmd-overlay")
        $triggerElement = $("#" + scope.triggerElementId)
        scope.$modal = $("#mkmd")
        scope.$body = $("body")

        init(scope.data)

        scope.$watch "data", (newValue, oldValue) ->

          init(newValue)

        , true

        $triggerElement.on("click", (el) ->

          scope.$body.addClass("modal-open");
          scope.$modal.addClass("mkmd-show")

          $overlay.off("click", removeModalHandler)
          $overlay.on("click", removeModalHandler)

        )
  }
