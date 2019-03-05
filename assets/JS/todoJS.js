//check if jQuery is connected
// if(jQuery){
// 	alert("all good!");
// }else{
// 	alert("not good!");
// }

//define variables for counting
var deleted = 0;
var complete;
var active;

//displays all the todos
$("#totalActive").text($("li.newToDo").length);

//when icon delete is clicked, remove the item from the list
$(document).on("click","i.delete", function(){
	//removing the item with fadeOut
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
		//count removed todos
		deleted ++;
		//writes active toods
	    $("#totalActive").text($("li.newToDo").length - $("span.completed").length);
	    //writes total completed(removed + completed)
	    $("#totalComp").text($("span.completed").length + deleted);
	});
	update();
});

//when element is clicked, cross it, but leave it visible
$(document).on("click","span", function(){
	$(this).toggleClass("deleted");
	//count completed todos
	complete = $("span.completed").length;
		 
	// counts active todos
	active = $("li.newToDo").length - complete;
	
	//write number of completed and active todos
	$("#totalComp").text($("span.completed").length + deleted);
	$("#totalActive").text(active);
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

		//changes active todos when new is added
		$("#totalActive").text($("li.newToDo").length - $("span.completed").length);
		
		 //resets input text
		 reset();

		 //if all is completed, restart completed to 0
		 resetCompleted();
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
	$("ul li:nth-child(3)").css("background","#DDE8FB");
}

//resets the completed and deleted to 0, when everyting is done
function resetCompleted(){
	if ($("span.completed").length === 0){
		$("span.completed").length = 0;
		deleted = 0;
		$("#totalComp").text($("span.completed").length + deleted);
	}
}