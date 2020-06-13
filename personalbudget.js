var userName = "Józiu";

function workingMenu()
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

window.onload = showCurrentMonth;

function showCurrentMonth(){
	printExpenses();
	printIncomes();
	printBalance();
	drawChart();
}

function showPreviousMonth(){
	
}

function showCurrentYear(){
	
}

function showCustomPeriod(){
	$('#period').css('display', 'block');
}

var totalExpenses = 0;
var totalIncomes = 0;

var Expense = function (amount, date, category, paymentMethod, comment = "brak") {
	this.amount = amount;
	this.date = date; 
	this.category = category; 
	this.paymentMethod = paymentMethod; 
	this.comment = comment; 
};

var expenses = new Array();

expenses.push(new Expense(560, "2020-05-06", "Wycieczka", "Gotówka"));
expenses.push(new Expense(40, "2015-12-05", "Jedzenie", "Gotówka", "Głodny był"));
expenses.push(new Expense(460, "2018-11-12", "Mieszkanie", "Karta debetowa"));
expenses.push(new Expense(0.01, "2020-01-22", "Higiena", "Karta kredytowa"));
expenses.push(new Expense(20, "2020-05-06", "Transport", "Gotówka"));
expenses.push(new Expense(3, "2020-04-06", "Rozrywka", "Gotówka"));
expenses.push(new Expense(23, "2020-05-26", "Ubranie", "Gotówka"));

var Income = function (amount, date, category, comment = "brak") {
	this.amount = amount;
	this.date = date; 
	this.category = category; 
	this.comment = comment; 
};

var incomes = new Array();

incomes.push(new Income(6650, "2020-05-06", "Wynagrodzenie"));
incomes.push(new Income(60, "2015-12-05", "Odsetki bankowe"));
incomes.push(new Income(80, "2018-11-12", "Sprzedaż na allegro"));
incomes.push(new Income(0.09, "2020-01-22", "Inne", "Napiwek"));


function printIncomes()
{
	totalIncomes = 0;
	
	var div = '<table><thead><tr><th colspan="2">Przychody</th></tr><tr><th>Kategoria</th><th>Kwota</th></tr></thead><tbody>';
	
	for(i=0; i<incomes.length; i++)
	{
		div += '<tr><td>' + incomes[i].category + '</td><td>' + incomes[i].amount + '</td></tr>' ;
		totalIncomes += incomes[i].amount;
	}
	
	div += '</tbody><tbody><tr><td class="sum">Suma:</td><td class="sum">' + totalIncomes + ' zł</td></tr>' ;
	div += "</tbody></table>";
	
	$('#incomes').html(div);
}

function printExpenses()
{	
	totalExpenses = 0;
	
	var div = '<table><thead><tr><th colspan="2">Wydatki</th></tr><tr><th>Kategoria</th><th>Kwota</th></tr></thead><tbody>';
	
	for(i=0; i<expenses.length; i++)
	{
		div += '<tr><td>' + expenses[i].category + '</td><td>' + expenses[i].amount + '</td></tr>' ;
		totalExpenses += expenses[i].amount;
	}
	
	div += '</tbody><tbody><tr><td class="sum">Suma:</td><td class="sum">' + totalExpenses + ' zł</td></tr>' ;
	div += "</tbody></table>";
	
	$('#expenses').html(div);
	$('#expenses table').tablesorter({sortList: [[1,1], [0,0]]});
}

function printBalance()
{
	var balance = totalIncomes - totalExpenses;
	var warning = 'Uff.. Żyjesz na krawędzi ;)';
	
	if(balance > 0)
	{
		warning = "Gratulacje. Świetnie zarządzasz finansami!";
		$('#balance').css('color', 'none');
	}
	else if (balance < 0)
	{
		warning = "Uważaj, wpadasz w długi!";
		$('#balance').css('color', 'red');
	}
	
	var div = '<table><tr><td class="sum">Bilans:</td><td class="sum">' + balance + ' zł</td></tr><tr><td colspan="2">' + warning +'</td></tr></table>';
	
	$('#balance').html(div);
}



google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
	
	var data = new google.visualization.DataTable();
	
	data.addColumn('string' , 'Expense');
	data.addColumn('number', 'Amount');
	
	data.addRows(expenses.length);
	
	for(i=0; i<expenses.length; i++)
	{
		data.setCell(i, 0, expenses[i].category);
		data.setCell(i, 1, expenses[i].amount);
	}
	
	var options = {
		title:'Wydatki', 
		titleTextStyle:{color:'#52361b', fontName:'Lato', fontSize:24, bold:1},
		legendTextStyle:{color:'darkgreen', fontName:'Lato', fontSize:16},
		width:700, 
		height:350,
		backgroundColor:'none',
		sliceVisibilityThreshold:.015,
		marginLeft:'auto',
		marginRight:'auto',
		marginBottom:'0px',
		paddings:'5px',
		pieHole:0.4,
		
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}