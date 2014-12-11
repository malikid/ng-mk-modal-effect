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
          var $closeBtn;
          $closeBtn = $("#" + scope.closeElementId);
          return $closeBtn.on("click", function(el) {
            el.stopPropagation();
            return removeModalHandler();
          });
        };
        removeModalHandler = function() {
          return scope.$modal.removeClass("mkmd-show");
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
          var $element, $overlay;
          $overlay = $(".mkmd-overlay");
          $element = $("#" + scope.triggerElementId);
          scope.$modal = $("#mkmd");
          init(scope.data);
          scope.$watch("data", function(newValue, oldValue) {
            return init(newValue);
          }, true);
          return $element.on("click", function(el) {
            scope.$modal.addClass("mkmd-show");
            $overlay.off("click", removeModalHandler);
            return $overlay.on("click", removeModalHandler);
          });
        });
      }
    };
  });

}).call(this);
