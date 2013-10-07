$(document).ready(function() {
	bindDishButtons();
	bindAutoButton();
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

function bindAutoButton() {
	$('.dish-auto').click(function() {
		(function loop(i) {
			setTimeout(function() {

				$.ajax({
					url: '/dish/' + i,
					type: 'PUT',
					success: function(res) {
						console.log('result: ' + res);
					}
				});

				loop(i? i-1 : 3);
			}, 1500);
		})(3);
	});
}