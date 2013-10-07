$(document).ready(function() {
	bindDishButtons();
	bindAutoButton();

	window.autoMode = 0;
});

function bindDishButtons() {
	$('button.dish').click(function() {
		clearInterval(autoMode);

		var dish = $(this).attr('dish');

		var el = $('.dish-container').find('.dish-info[dish="'+dish+'"]');

		dishRequest($(this).attr('dish'), el);
	});
}

function bindAutoButton() {
	$('.dish-auto').click(function() {
		window.currentDish = 0;

		autoMode = setInterval(function() {
			var el = $('.dish-container').find('.dish-info[dish="'+currentDish+'"]');
			
			dishRequest(currentDish, el);
			currentDish = (currentDish+1)%4;
		}, 1500);
	});
}

function dishRequest(dish, el) {
	$.ajax({
		url: '/dish/' + dish,
		type: 'PUT',
		success: function(res) {
			console.log('dish' + dish + 'result: ' + res);
			el.html(res);
		}
	});
}