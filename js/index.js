window.onload = function (e) {

	setTimeout(()=>{
		$('.load').fadeOut(500);
	}, 2500);
}

jQuery(document).ready(function($) {
	
	String.prototype.deleteChar = function(){
		let text = this;
		if(/^\*/.test(this)){
			text = text.split('');
			text.shift();
			text = text.join('');			
		}
		return text;
	};

	

	$('.modal').css('dispaly','block').fadeOut(0);

	$('.open-modal').click(function(event) {
		$('.modal').fadeIn('fast');
	});

	$('.btn-close').click(function(event) {
		$('.modal').fadeOut('fast');
	});

	$('form[name="reg"] input').on({
		'focus': function(event) {
				change.call(this);
			},
		'blur': function(event) {
				check.call(this);
			}
			
	});

	$('form[name="reg"]').submit(function(event) {
		let send = true;
		$('form[name="reg"] input').each(function() {
			if(!$(this).val()){
				send = false;
				error.call(this);
			}
			let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
			let phoneReg = /^[\+]\d{3}\d{2}\d{2}\d{2}\d{2}$/;
			if ($(this).val()){
				if($(this).attr('name') === 'email' && 
					!emailReg.test($(this).val())){
					send = false;
					error.call(this);
				}

				if($(this).attr('name') === 'pass' &&
					!passReg.test($(this).val())){
					send = false;
					error.call(this);
				}

				if($(this).attr('name') === 'repass' &&
					$(this).val() !== $('input[name = "pass"]').val()){
					send = false;
					error.call(this);
				}

				if($(this).attr('name') === 'phone' && 
					!phoneReg.test($(this).val())){
					send = false;
					error.call(this);
				}
			}


		});

		if(send){
			showModal($('.modal-success'));
			send = false;// սա ուղակի գրել եմ որ տեսնեք ինչպես է աշխատում այս պատուհանը, ասեմ նույն ձևով աշխատում են modal-error և modal-commingSoon պատուհանները։
			// ուղակի կներդնեք այս function showModal և կկարչեք համապատսխան պատուհանին կախված սեռվերի վերադարցված պատասխանից։
		}

		return send;
	});

	$('.message').click(function(event) {
		if(event.target.className === 'modal-body' || event.target.className === 'container' || event.target.className === '') return;
		closeModal($(this));
	});

	$('.soon').click(function(event) {
		showModal($('.modal-commingSoon'));
		return false;
	});



	function showModal (elem) {
		$(elem).css('display', 'flex');
		$(elem).fadeTo(500, 1, function()  {
			$(elem).children().css('transform', 'translateY(0%)');
		});
	}

	function closeModal (elem) {
		$(elem).fadeTo(500, 0, function()  {
			$(elem).children().css('transform', 'translateY(-500%)');
			$(elem).css('display', 'none');
		});
	}

	function check () {
		if($(this).val()){
			change.call(this,'#15A1BA');
			let oldText =  $(this).prev('label').text().deleteChar();
			$(this).prev('label').text(`${oldText}`)
		}else{
			if($(this).css('border-bottom-color') !== 'rgb(196, 11, 11)'){
				$(this).css('border-bottom-color', '#ddd');
				$(this).prev('label').css({top:'1rem', color: '#000 '});
			}
		}	
	}

	function change(color) {
		$(this).css('border-bottom-color', color);
		$(this).prev('label').css({top:'-1.5rem', color: color});
	}

	function error() {
		change.call(this,"#C40B0B");
		let oldText =  $(this).prev('label').text().deleteChar();
		$(this).prev('label').text(`*${oldText}`);
		$(this).next().css('display', 'block');
	}

});