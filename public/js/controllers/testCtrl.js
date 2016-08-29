app.controller('testCtrl', function($scope){

	$('.form-666').on('keydown', 'input', function (event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        var $this = $(event.target);
	        var index = parseFloat($this.attr('data-index'));
	        $('[data-index="' + (index + 1).toString() + '"]').focus();
	        
	        $('#l'+(index+1)).addClass('focused');
	    }
	});
	
	
	$('#a1').on('focus', function(){
		$('#a1').addClass('focused');
		$('#l1').addClass('focused');
		$('#a2').removeClass('focused');
		$('#l2').removeClass('focused');
		$('#a3').removeClass('focused');
		$('#l3').removeClass('focused');
	})
	$('#a2').on('focus', function(){
		$('#a1').removeClass('focused');
		$('#l1').removeClass('focused');
		$('#a2').addClass('focused');
		$('#l2').addClass('focused');
		$('#a3').removeClass('focused');
		$('#l3').removeClass('focused');
	})
	$('#a3').on('focus', function(){
		$('#a1').removeClass('focused');
		$('#l1').removeClass('focused');
		$('#a2').removeClass('focused');
		$('#l2').removeClass('focused');
		$('#a3').addClass('focused');
		$('#l3').addClass('focused');
	})
});
