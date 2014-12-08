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
        var $closeBtn, $element, $modal, $overlay, init, removeModalHandler, setEffect, setStyle;
        scope.oldEffect = null;
        removeModalHandler = function() {
          $modal.removeClass("mkmd-show");
          if (scope.isWithPerspective) {
            return $(document.documentElement).removeClass("md-perspective");
          }
        };
        setEffect = function(newEffect) {
          if (scope.oldEffect) {
            $modal.removeClass(scope.oldEffect);
          }
          scope.oldEffect = newEffect;
          return $modal.addClass(newEffect);
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
              $modal.removeClass("mkmd-modal-basic-y");
              break;
            default:
              $modal.addClass("mkmd-modal-basic-y");
              cssObj.top = style.top;
          }
          return $modal.css(cssObj);
        };
        init = function(data) {
          console.log("data", data);
          if (data.effect) {
            setEffect(data.effect);
          }
          if (data.style) {
            return setStyle(data.effect, data.style);
          }
        };
        $overlay = $(".mkmd-overlay");
        $element = $("#" + scope.triggerElementId);
        $modal = $("#mkmd");
        $closeBtn = $modal.find("#" + scope.closeElementId);
        init(scope.data);
        scope.$watch("data", function(newValue, oldValue) {
          console.log("watch");
          if (newValue === oldValue) {
            return;
          }
          return init(newValue);
        }, true);
        $element.on("click", function(el) {
          $modal.addClass("mkmd-show");
          $overlay.off("click", removeModalHandler);
          return $overlay.on("click", removeModalHandler);
        });
        return $closeBtn.on("click", function(el) {
          el.stopPropagation();
          return removeModalHandler();
        });
      }
    };
  });

}).call(this);
