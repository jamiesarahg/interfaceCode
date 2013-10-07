$(document).ready(function() {
	bindDishButtons();
});

function bindDishButtons() {
	$('.dish').click(function() {
		$.ajax({
			url: '/dish/'+$(this).attr('dish'), 
			type: 'PUT',
			success: function(res) {
				console.log(res);
			}
		});
	});
}