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
	    $("#totalActive").text($("li.newToDo").length - $(".todo.completed").length);
	    //writes total completed(removed + completed)
	    $("#totalComp").text($(".todo.completed").length + deleted);
	});
	//resets the color of the first todo 
	$(".newToDo:nth-child(3)").css("background","#DDE8FB");
});

//when element is clicked, cross it, but leave it visible
$(document).on("click",".todo", function(){
	//toggle class completed
	$(this).toggleClass("completed");
	//toggle class active
	$(this).toggleClass("active");
	
	//count completed todos
	complete = $(".todo.completed").length;
		 
	// counts active todos
	active = $("li.newToDo").length - complete;
	
	//write number of completed and active todos
	$("#totalComp").text($(".todo.completed").length + deleted);
	$("#totalActive").text(active);
});

//when press enter, add new item to the list, at the bottom
$("input").on("keypress", function(event){
	if(event.keyCode == 13){
		//grabbing new todo text from input
		var newItem = $(this).val();
		//create variable with html for li we want to append
		var newLI = '<li class="newToDo"><i class="far fa-trash-alt delete visible"></i><span class="todo active"> </span></li>';
		$("ul").append(newLI);
		//adding the text to last span in todo list
		$("li .todo:last").text(" " + newItem);

		//changes active todos when new is added
		$("#totalActive").text($("li.newToDo").length - $(".todo.completed").length);
		
		  //resets input text
		$("#addNewInput").val("");

		 //if all is completed, restart completed to 0
		 resetCompleted();
		 //resets the color when new todo is added
		 resetColor();
	};

});

//toggle input field when + is clicked
$("#plus").on("click", function(){
	$("li:nth-child(2)").slideToggle("slow");
});

//filter active, completed and all todos
$(document).on("click","input[type='checkbox']", function(){
		
	var active_todo = $("input[value='activeTodo']");
	var compl_todo = $("input[value='completeTodo']");
	var all_todo = $("input[value='allTodo']");
	
	//when checked
	if ($(this).is(":checked")){
		
		//set the checked to true
		$(this).prop("checked", true);
		
		//if active is clciked and checked
		if($(this).val() === "activeTodo"){
			//show active
			$("span.active").parent().show();
			
			//hide existing completed
			$("span.completed").parent().hide();					
			//show add new input
			$("li:nth-child(2)").show();
			//uncheck completed
			compl_todo.prop("checked", false);
			//uncheck all
			all_todo.prop("checked", false);

			//if completed is checked
		} else if($(this).val() === "completeTodo"){
			//hide active
			$("span.active").parent().hide();
			//show completed
			$("span.completed").parent().show();
			//hide add new in completed mode
			$("li:nth-child(2)").hide();
			//suncheck active and all
			active_todo.prop("checked", false);
			all_todo.prop("checked", false);
			
			//if all is checked
		}else if($(this).val() === "allTodo"){
			//show active and completed
			$("span.completed").parent().show();
			$("span.active").parent().show();
			//show add new input
			$("li:nth-child(2)").show();
			//unckeck active and completed
			active_todo.prop("checked", false);
			compl_todo.prop("checked", false);

		}
	//if active and completed are unchecked
	}else if($(this).not(":checked")){
		//set all as checked
		all_todo.prop("checked", true);
		//show both, active and completed
		$("span.completed").parent().show();
		$("span.active").parent().show()
	}
	//reset the colors
	resetColor();
});

//click event on new todos when in active or completed mode
$(document).on("click",".todo", function(){
	//if active or completed mode is checked
	if($("input[name='active'").is(":checked") || $("input[name='complete'").is(":checked")){
		//remove the todo when completed or (un)completed
		$(this).parent().fadeOut();

		//reset the color of all todos to be the same
		$(".newToDo").css("background","#DDE8FB");
		//set the odd .active to be the diffrent color - when in actvie mode
		$(".todo.active:odd").parent().css("background","#77E8D6");
		//set the odd .completed to be diffrent color-when in completed mode
		$(".todo.completed:odd").parent().css("background","#77E8D6");
	}

});

//resets colors of todo's, when in different modes
function resetColor(){
	//if in mode all
 	if($("input[name='all'").is(":checked")){
 		//set all to be the same color
		$(".newToDo").css("background","#DDE8FB");
		//set the odd rows to be the different color
		$(".newToDo:odd").css("background","#77E8D6");
	}
	//if in mode completed
	if( $("input[name='complete'").is(":checked")){
		//set all to be the same color
		$(".newToDo").css("background","#DDE8FB");
		//set the odd completed rows to be the different color
		$(".todo.completed:odd").parent().css("background","#77E8D6");
	}
	//if in mode active
	if($("input[name='active'").is(":checked")){
		//set all  to be the same color
		$(".newToDo").css("background","#DDE8FB");
		//set the odd active rows to be the different color
		$(".todo.active:odd").parent().css("background","#77E8D6");
	}
}

//resets the completed and deleted to 0, when everyting is done
function resetCompleted(){
	//if all is completed
	if ($("span.completed").length === 0){
		//set the completed length to 0
		$("span.completed").length = 0;
		//deleted to 0
		deleted = 0;
		//update the text
		$("#totalComp").text($("span.completed").length + deleted);
	}
}