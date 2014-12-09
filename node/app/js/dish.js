//Button Binding
/$(document).ready(function() {
	bindDishButtons();
	bindAutoButton();

	window.autoMode = 0;
});

function bindDishButtons() {
	$('.dish').click(function() {
		clearInterval(autoMode);
		$('.dish-auto').removeClass('active');

		var dish = $(this).attr('dish');

		var el = $('.dish-container').find('.dish-info[dish="'+dish+'"]');

		dishRequest($(this).attr('dish'), el);
	});
}

function bindAutoButton() {
	$('.dish-auto').click(function() {
		if ($('.dish-auto').hasClass('active')) return;
		window.currentDish = 0;

		$('.dish-auto').addClass('active');

		autoMode = setInterval(function() {
			var el = $('.dish-container').find('.dish-info[dish="'+currentDish+'"]');
			
			dishRequest(currentDish, el);
			currentDish = (currentDish+1)%4;
		}, 1500);
	});
}

function dishRequest(dish, el) {
	el.parent().addClass('active');
	$.ajax({
		url: '/dish/' + dish,
		type: 'PUT',
		success: function(res) {
			console.log('dish' + dish + 'result: ' + res);
			el.html(res? res+' lux' : 'test');
			el.parent().removeClass('active');
		}
	});
}