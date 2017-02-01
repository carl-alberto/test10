jQuery( document ).ready( function ( e ) {
	$.ajax({
		console.log('test');

		url: "http://localhost/test1/",
		success: function( data ) {
			alert( 'Your home page has ' + $(data).find('div').length + ' div elements.');
		}
	})
});
