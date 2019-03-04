//check if jQuery is connected
// if(jQuery){
// 	alert("all good!");
// }else{
// 	alert("not good!");
// }

//when over list, show delete icon
$(document).on("mouseenter",".newToDo", function(){
	$("i.delete", this).fadeIn("slow", function(){
		$("i.delete", this).removeClass("visible");
	});
});

//when not over item, remove delete icon
$(document).on("mouseleave",".newToDo", function(){
	$("i.delete", this).fadeOut("fast", function(){
		$("i.delete", this).addClass("visible");
	});

});

//when icon delete is clicked, remove the item from the list
$(document).on("click","i.delete", function(){
	//removing the item with fadeOut
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	update();
});

//when element is clicked, cross it, but leave it visible
$(document).on("click","span", function(){
	$(this).toggleClass("deleted");
});

//when press enter, add new item to the list, at the bottom
$("input").on("keypress", function(event){
	if(event.keyCode == 13){
		//grabbing new todo text from input
		var newItem = $(this).val();
		//create variable with html for li we want to append
		var newLI = '<li class="newToDo"><i class="far fa-trash-alt delete visible"></i><span> </span></li>';
		$("ul").append(newLI);
		//adding the text to last span in todo list
		$("span:last").text(" " + newItem);
		reset();
	};

});

//toggle input field when + is clicked
$("#plus").on("click", function(){
	$("li:nth-child(2)").slideToggle("slow");
});

//reset the input field
function reset(){
	$("input").val("");
}

//update background colors of lis
function update(){
	$("ul li:nth-child(3)").css("background","white");
}