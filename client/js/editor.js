(function($){

    var $widthInput          = $('#plan-width-input'),
        $heightInput         = $('#plan-height-input'),
        $applyPlanSizeBtn    = $('.applyPlanSize'),
        $planCanvas          = $('.plan'),
        $trackChooserButtons = $('.editor-controls .buttons').children();

    var currentPlanWidth = 5,
        currentPlanHeight = 5;


    $(function() {
        setupEventListeners();
        setupCanvas();
    });


    function setupCanvas() {
        for (var y = 0; y < currentPlanHeight; y++) {
            $planCanvas.append('<div class="row"></div>')
            for (var x = 0; x < currentPlanWidth; x++) {
                $planCanvas.children().eq(y).append('<div class="button" data-x="' + x + '" data-y="' + y + '"></div>');
            }
        }

        $planCanvas.children().children().each(function() {
            $this = $(this);
            $this.on('click', {sender : $this}, applyTrack);
        });

    }

    function setupEventListeners() {
        $applyPlanSizeBtn.on('click', changePlanSize);
    }


    // FIXME: Holy shit, even this glitches out, maybe I shoudl resign to polymer??
    function applyTrack(event) {
        var $this = event.data.sender;
        console.log($this);
        $this.addClass('track g0');

    }

    // FIXME: This is quite buggy and I don't know why
    function changePlanSize() {
        console.log("Changing plan size");
        var newPlanWidth = $widthInput.val(),
            newPlanHeight = $heightInput.val();

        if (newPlanWidth > currentPlanWidth) {
            for (var i = 0; i < (newPlanWidth - currentPlanWidth); i++) {
                $planCanvas.children().append('<div class="button"></div>');
                $planCanvas.children().children().off('click');
                $planCanvas.children().children().each(function() {
                    $this = $(this);
                    $this.on('click', {sender : $this}, applyTrack);
                });
            }
        }
        else if (newPlanWidth < currentPlanWidth) {
            for (var x = currentPlanWidth; x > newPlanWidth; x--) {
                $planCanvas.children().children(':last-child()').remove();
            }
        }
        if (newPlanHeight > currentPlanHeight) {
            for (var i = 0; i < (newPlanHeight - currentPlanHeight); i++) {
                $planCanvas.append('<div class="row"></div>');
                $lastRow = $planCanvas.children(':last-child()');
                for (var x = 0; x < newPlanWidth; x++) {
                    $lastRow.append('<div class="button"></div>');
                }
            }
        }
        currentPlanWidth = newPlanWidth;
        currentPlanHeight = newPlanHeight;

    }

})(jQuery)
