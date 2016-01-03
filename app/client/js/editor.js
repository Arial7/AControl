(function($){

    var $widthInput = $('input.planWidth'),
        $heightInput = $('input.planHeight'),
        $applyPlanSizeBtn = $('.applyPlanSize'),
        $planCanvas = $('.plan'),
        $trackChooserButtons = $('.editor-controls .buttons').children();


    $(function(){
        setupEventListeners();
    });


    function setupEventListeners() {
        $applyPlanSizeBtn.on('click', function() {
            changePlanSize();
        });

    }


    function changePlanSize() {
        console.log("Changing plan size");
        console.log("Plan Size: " + $widthInput.val() + "|" + $heightInput.val());

    }

})(jQuery)
