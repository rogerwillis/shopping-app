$(document).ready(function() {

function doCompletedItemsExist(){
if($(".deleted-items-list div").length) {
 $('.completed-title').show();

 	}else{
		$('.completed-title').hide();
		
		}
	
	}
	
	doCompletedItemsExist();
	
    /*Open Add Items to List Section*/
    $(".add-items-to-list").on("click", function() {
        $(".add-items").slideDown();
        $(this).hide();
    });

    /*Close Add items to List*/
    $(".done").on("click", function() {
        $(".add-items").slideUp();
        $(".add-items-to-list").show();
    });


    /*Add Item to List*/
    $(".add-item-to-list").on("click", function() {
        var inputVal = $("#addItem").val();
        if (inputVal != "") {
			var inputExists = $('.item-text').text().indexOf(inputVal) > -1;
			if (inputExists) {
   			 $('.item-error').text("Hey Jerky! "+inputVal+" already exist!").fadeIn().delay(1500).fadeOut();
		}
		else{
			
            $(".items-list").prepend('<div class="col-md-12 item text-center"><span class="item-status no-checkmark"></span><span class="item-text"> ' + inputVal + '</span><span class="item-delete"></span></div>');
            $("#addItem").val("");
			var itemsList = $('.items-list').html();
   			localStorage.setItem('itemsList', itemsList);
			}
		
			
			
   
   		
		


        } else {
			$('.item-error').fadeIn().delay(1000).fadeOut();
            
        }



    });
	
	/*Trigger Button Click on Enter Button Press*/
	$("#addItem").keyup(function(event){
		if(event.keyCode == 13){
			$(".add-item-to-list").click();
		}
	});
	
	/*Trigger Button Click on Escape Button Press*/
	$("body").keyup(function(event){
		if(event.keyCode == 27){
			$(".done").click();
		}
	});
	
	
	
	if(localStorage.getItem('itemsList')) {
$('.items-list').html(localStorage.getItem('itemsList'));
}

    /*Check Off Items from List TODO: Move to Completed Items Sections*/
    $("body").on("click",".item-status", function() {
        $(this).toggleClass("checkmark");
        $(this).closest(".item").find(".item-text").toggleClass("strike-out");
        $(this).closest(".item").toggleClass("item-disable");
        /*Moved Checked off Div to end of list*/
        $(this).closest(".item").hide().appendTo(".items-list").fadeIn("slow");	
			$(this).closest(".item").remove().clone().appendTo('.deleted-items-list').css({'opacity':'1'});
			$("span.checkmark").remove();
			doCompletedItemsExist();
    });



    /*Delete Items From List */
    $("body").on("click", ".item-delete" ,function() {
        $(this).closest(".item").remove();
		var itemsList = $('.items-list').html();
   			localStorage.setItem('itemsList', itemsList);
		doCompletedItemsExist();
    });
    /* TODO UnCheck Items from List*/
	/* TODO Move Item from completed to uncompleted */
	/* If no completed Items don't show title */
	

});