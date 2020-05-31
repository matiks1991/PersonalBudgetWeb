var userName = "Józiu";

function menu()
{
$(document).ready(function() {
var NavY = $('.nav').offset().top;
 
var stickyNav = function(){
var ScrollY = $(window).scrollTop();
	  
if (ScrollY> NavY ) { 
	$('.nav').addClass('sticky');
} else {
	$('.nav').removeClass('sticky'); 
}
};
 
stickyNav();
 
$(window).scroll(function() {
	stickyNav();
});
});
}

function writeUserName()
{
	$('#user').html('<h4>Zalogowany:</h4>' + userName);
}

function setCurrentDate()
{
	var today = new Date();

	var date = today.toISOString().substr(0, 10);
	
	$('#date').val(date);
}

$('#customPeriod').click(
	$('#periodTime').css('display', 'block');
);

