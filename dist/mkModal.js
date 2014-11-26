(function() {
  angular.module("mkModal", []).directive("mkModal", function() {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        triggerElementId: "@",
        closeElementId: "@",
        height: "="
      },
      template: "<div id=\"mkmd\" class=\"mkmd-modal mkmd-effect-7\">\n  <div ng-transclude=\"ng-transclude\" class=\"mkmd-content\"></div>\n</div>\n<div class=\"mkmd-overlay\"></div>",
      link: function(scope, element, attrs) {
        var $closeBtn, $element, $modal, $overlay, removeModalHandler;
        $overlay = $(".mkmd-overlay");
        $element = $("#" + scope.triggerElementId);
        $modal = $("#mkmd");
        $modal.css({
          height: scope.height + "px"
        });
        $closeBtn = $modal.find("#" + scope.closeElementId);
        removeModalHandler = function() {
          return $modal.removeClass("mkmd-show");
        };
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
