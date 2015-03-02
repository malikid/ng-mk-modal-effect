(function() {
  angular.module("mkModal", []).directive("mkModal", function() {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        triggerElementId: "@",
        closeElementId: "@",
        mkModalId: "@",
        data: "=",
        beforeClosed: "&beforeClose",
        afterClosed: "&afterClose"
      },
      template: "<div id=\"{{mkModalId}}\" class=\"mkmd-modal mkmd-modal-basic-y\">\n  <div ng-transclude=\"ng-transclude\" class=\"mkmd-content\"></div>\n</div>\n<div ng-if=\"data.showOverlay\" class=\"mkmd-overlay\"></div>",
      link: function(scope, element, attrs) {
        var addCloseBtnClickEvent, init, removeModalHandler, setEffect, setStyle;
        scope.data.showOverlay = scope.data.showOverlay === void 0 ? true : scope.data.showOverlay;
        scope.oldEffect = null;
        scope.closeElement = null;
        addCloseBtnClickEvent = function() {
          var $closeElement;
          if (!scope.closeElementId) {
            return;
          }
          $closeElement = $("#" + scope.closeElementId);
          if ($closeElement) {
            scope.closeElement = $closeElement;
          }
          return $closeElement.on("click", function(el) {
            el.stopPropagation();
            return removeModalHandler();
          });
        };
        removeModalHandler = function() {
          scope.beforeClosed();
          scope.$modal.removeClass("mkmd-show");
          scope.$body.removeClass("modal-open");
          return scope.afterClosed();
        };
        setEffect = function(newEffect) {
          if (scope.oldEffect) {
            scope.$modal.removeClass(scope.oldEffect);
          }
          scope.oldEffect = newEffect;
          return scope.$modal.addClass(newEffect);
        };
        setStyle = function(effect, style) {
          var cssObj;
          cssObj = {
            height: style.height,
            width: style.width,
            left: style.left
          };
          switch (effect) {
            case "mkmd-effect-sdsat":
            case "mkmd-effect-susab":
              scope.$modal.removeClass("mkmd-modal-basic-y");
              cssObj.top = "";
              break;
            default:
              scope.$modal.addClass("mkmd-modal-basic-y");
              cssObj.top = style.top;
          }
          return scope.$modal.css(cssObj);
        };
        init = function(data) {
          if (data.effect) {
            setEffect(data.effect);
          }
          if (data.style) {
            setStyle(data.effect, data.style);
          }
          return addCloseBtnClickEvent();
        };
        return setTimeout((function() {
          var $overlay, $triggerElement, zIndex, _ref;
          $overlay = $(".mkmd-overlay");
          $triggerElement = $("#" + scope.triggerElementId);
          scope.$modal = scope.mkModalId ? $("#" + scope.mkModalId) : $(".mkmd-modal");
          scope.$body = $("body");
          zIndex = typeof ((_ref = scope.data) != null ? _ref.zIndex : void 0) === "number" ? scope.data.zIndex : 2000;
          scope.$modal.css("z-index", zIndex);
          $overlay.css("z-index", zIndex - 1);
          init(scope.data);
          scope.$watch("data", function(newValue, oldValue) {
            return init(newValue);
          }, true);
          return $triggerElement.on("click", function(el) {
            if (scope.data.showOverlay) {
              scope.$body.addClass("modal-open");
            }
            scope.$modal.addClass("mkmd-show");
            $overlay.off("click", removeModalHandler);
            return $overlay.on("click", removeModalHandler);
          });
        }), 0);
      }
    };
  });

}).call(this);
