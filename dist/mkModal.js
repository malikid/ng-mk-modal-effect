(function() {
  angular.module("mkModal", []).directive("mkModal", function() {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        triggerElementId: "@",
        closeElementId: "@",
        data: "=",
        test: "="
      },
      template: "<div id=\"mkmd\" class=\"mkmd-modal\">\n  <div ng-transclude=\"ng-transclude\" class=\"mkmd-content\"></div>\n</div>\n<div class=\"mkmd-overlay\"></div>",
      link: function(scope, element, attrs) {
        var $closeBtn, $element, $modal, $overlay, checkWithPerspective, init, removeModalHandler, setEffect;
        scope.oldEffect = null;
        scope.isWithPerspective = false;
        checkWithPerspective = function(effect) {
          switch (effect) {
            case "mkmd-effect-sup":
            case "mkmd-effect-slp":
            case "mkmd-effect-sdp":
              return true;
            default:
              return false;
          }
        };
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
          $modal.addClass(newEffect);
          return scope.isWithPerspective = checkWithPerspective(newEffect);
        };
        init = function(data) {
          if (data.effect) {
            setEffect(data.effect);
          }
          if (data.style) {
            return $modal.css({
              height: data.style.height,
              width: data.style.width
            });
          }
        };
        $overlay = $(".mkmd-overlay");
        $element = $("#" + scope.triggerElementId);
        $modal = $("#mkmd");
        $closeBtn = $modal.find("#" + scope.closeElementId);
        init(scope.data);
        scope.$watch("data", function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          return init(newValue);
        }, true);
        $element.on("click", function(el) {
          $modal.addClass("mkmd-show");
          $overlay.off("click", removeModalHandler);
          $overlay.on("click", removeModalHandler);
          if (scope.isWithPerspective) {
            return setTimeout(function() {
              return $(document.documentElement).addClass("md-perspective");
            }, 25);
          }
        });
        return $closeBtn.on("click", function(el) {
          el.stopPropagation();
          return removeModalHandler();
        });
      }
    };
  });

}).call(this);
