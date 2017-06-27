document.addEventListener("DOMContentLoaded", function(event) { 
	document.getElementById("navbar-toggle-button").addEventListener('click', function(){
		var button = this;
		var navbarCollapse = document.getElementById("navbar-collapse");
		if(navbarCollapse.classList.contains('collapse')){
			navbarCollapse.classList.remove("collapse");
			navbarCollapse.classList.remove("navbar-collapse");
		}
		else{
			navbarCollapse.classList.add("collapse");
			navbarCollapse.classList.add("navbar-collapse");
			button.focus();
			button.blur();
		}
	});
});