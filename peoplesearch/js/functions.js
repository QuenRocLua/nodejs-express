var functions = {
	errortip: function(html){
		$("#errortip").html(html);		
		$("#errortip").fadeIn();
		$("#errortip").fadeOut(3000);
	},

	phonecheck: function(phone){
		return /(^(13\d|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7})$/.test(phone);
	}
};


