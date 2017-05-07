app.service('autoCursor', ['$document', function($document){

	$document.ready(function(){
		$('.input').keyup(function(e){
			if(e.which!==9){
				if(e.which===8){
		        	var pre = $(this).parent().prev().find('.input');
		        	if(pre.length===0){
		        		pre = $(this).parent().parent().prev().find('.input').last();
		        	}
			        pre.focus();
				} else {
		        	var next = $(this).parent().next().find('.input');
		        	if(next.length===0){
		        		next = $(this).parent().parent().next().find('.input').first();
		        	}
			        next.focus();
				}
			}
			
		}); 	
	});

}]);
