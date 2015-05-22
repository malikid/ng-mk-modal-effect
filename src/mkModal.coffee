angular.module("mkModal", []).directive "mkModal", ($timeout) ->

  return {
    
    restrict: "E"
    transclude: true
    scope:
      triggerElementId: "@"
      closeElementId: "@"
      mkModalId: "@"
      data: "="
      beforeClosed: "&beforeClose"
      afterClosed: "&afterClose"
    template: """{html}"""

    link: (scope, element, attrs) ->

      scope.data.showOverlay = if scope.data.showOverlay is undefined then true else scope.data.showOverlay

      scope.oldEffect = null
      scope.closeElement = null

      addCloseBtnClickEvent = () ->

        unless scope.closeElementId
          return

        $closeElement = $("#" + scope.closeElementId)
        scope.closeElement = $closeElement if $closeElement

        $closeElement.off("click." + scope.mkModalId)

        $closeElement.on("click." + scope.mkModalId, (el) ->

          el.stopPropagation()
          removeModalHandler()

        )

        return

      removeModalHandler = () ->

        return if scope.beforeClosed() is false
        scope.$modal.removeClass("mkmd-show")
        scope.$body.removeClass("modal-open")
        scope.afterClosed()
        return

      overlayClickHandler = () ->
        removeModalHandler()
        scope.$apply()
        return


      setEffect = (newEffect) ->

        scope.$modal.removeClass(scope.oldEffect) if scope.oldEffect
        scope.oldEffect = newEffect
        scope.$modal.addClass(newEffect)
        return

      setStyle = (effect, style) ->

        cssObj =
          height: style.height
          width: style.width
          left: style.left

        switch effect
          when "mkmd-effect-sdsat", "mkmd-effect-susab"
            scope.$modal.removeClass("mkmd-modal-basic-y")
            cssObj.top = ""
          else
            scope.$modal.addClass("mkmd-modal-basic-y")
            cssObj.top = style.top

        scope.$modal.css(cssObj)
        return

      init = (data) ->

        if data.effect
          setEffect(data.effect)

        if data.style
          setStyle(data.effect, data.style)

        addCloseBtnClickEvent()
        return

      $timeout () ->

        $overlay = $(".mkmd-overlay")
        $triggerElement = $("#" + scope.triggerElementId)

        scope.$modal = if scope.mkModalId then $("#"+ scope.mkModalId) else $(".mkmd-modal")
        scope.$body = $("body")

        zIndex = if typeof scope.data?.zIndex is "number" then scope.data.zIndex else 2000
        scope.$modal.css("z-index", zIndex)
        $overlay.css("z-index", zIndex - 1)

        init(scope.data)

        scope.$watch "data", (newValue, oldValue) ->

          init(newValue)

        , true

        $triggerElement.on("click." + scope.mkModalId, (el) ->

          scope.$body.addClass("modal-open") if scope.data.showOverlay
          scope.$modal.addClass("mkmd-show")
          $overlay.off("click." + scope.mkModalId, overlayClickHandler)
          $overlay.on("click." + scope.mkModalId, overlayClickHandler)

        )

        return

      , 0

      return
  }
