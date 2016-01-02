(function($){

    var $widthInput = $('input.planWidth'),
        $heightInput = $('input.planHeight'),
        $planCanvas = $('.plan'),
        $trackChooserButtons = $('.editor-controls .buttons').children();
       
     
    setupEventListeners();


    function setupEventListeners() {
        $widthInput.on('change', changePlanSize);
        $heightInput.on('change', changePlanSize);
    }
     
       
    function changePlanSize() {
        console.log($widthInput.val() + "|" + $heightInput.val());

    }
    
})(jQuery)
