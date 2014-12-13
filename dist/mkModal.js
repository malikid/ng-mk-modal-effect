(function() {
  angular.module("mkModal", []).directive("mkModal", function() {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        triggerElementId: "@",
        closeElementId: "@",
        data: "="
      },
      template: "<div id=\"mkmd\" class=\"mkmd-modal mkmd-modal-basic-y\">\n  <div ng-transclude=\"ng-transclude\" class=\"mkmd-content\"></div>\n</div>\n<div class=\"mkmd-overlay\"></div>",
      link: function(scope, element, attrs) {
        var addCloseBtnClickEvent, init, removeModalHandler, setEffect, setStyle;
        scope.oldEffect = null;
        addCloseBtnClickEvent = function() {
          var $closeElement;
          $closeElement = $("#" + scope.closeElementId);
          return $closeElement.on("click", function(el) {
            el.stopPropagation();
            return removeModalHandler();
          });
        };
        removeModalHandler = function() {
          scope.$modal.removeClass("mkmd-show");
          return scope.$body.removeClass("modal-open");
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
              break;
            case "mkmd-effect-susab":
              scope.$modal.removeClass("mkmd-modal-basic-y");
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
        return angular.element(document).ready(function() {
          var $overlay, $triggerElement;
          $overlay = $(".mkmd-overlay");
          $triggerElement = $("#" + scope.triggerElementId);
          scope.$modal = $("#mkmd");
          scope.$body = $("body");
          init(scope.data);
          scope.$watch("data", function(newValue, oldValue) {
            return init(newValue);
          }, true);
          return $triggerElement.on("click", function(el) {
            scope.$body.addClass("modal-open");
            scope.$modal.addClass("mkmd-show");
            $overlay.off("click", removeModalHandler);
            return $overlay.on("click", removeModalHandler);
          });
        });
      }
    };
  });

}).call(this);
