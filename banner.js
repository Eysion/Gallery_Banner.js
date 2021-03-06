/**基于Jquery的图片轮播组件**/
(function($) {
	$.fn.bannerjs = function(options) {
		var defaults = {
			loading : 	true,					//是否开启loading
			loadingImg : 	'./loading.gif',				//设定loading的图片		
			bannerArrow : 	true,					//是否显示箭头
			bannerWheel : 	true,					//是否开启滚轮事件
			bannerDisk : 	true,					//是否开启焦点切换事件
			bannerauto : 	true,					//是否开启自动轮播
			autoTime : 	5000,					//设置自动轮播时间
			bannerImg : 	['./1.jpg' , './2.jpg' ,'./3.gif'],		//图片地址---以数组格式  ["图片地址1..","图片地址2"]
			bannerPadding: 2,					//单个图片间的补白
			bannerShow : 	1 					//一次展示多少个图片
		}
		,bannerBox = $(this)
		,options = $.extend(defaults, options)
		,banner_list = '<div class="bannerjs-list"></div>'
		,banner_disk = '<div class="bannerjs-disk"></div>'
		,banner_arrow = '<span class="goprev">&lt;</span><span class="gonext">&gt;</span>';

		bannerBox.append(banner_list+banner_disk+banner_arrow).before('<div class="bannerjs-load"><img src="'+options.loadingImg+'" /></div>');
		for (var i = 0; i < options.bannerImg.length; i++) {
			bannerBox.find('.bannerjs-list').append('<div class="bannerjs-item"><img src=" '+options.bannerImg[i]+' "/></div>');
		};

		var bannerType = 1
			,bannergo = options.bannerShow
			,bannerlist = bannerBox.find('.bannerjs-list')
			,devellen = bannerlist.find('.bannerjs-item').length
			,bannerdisk = bannerBox.find('.bannerjs-disk')
			,subit =[devellen/options.bannerShow];

		$(window).load(function() {
			// Loading
			if(options.loading == true){
				bannerBox.prev('.bannerjs-load').hide();
				bannerBox.fadeIn(400);
			};

			for (var i = 0; i < subit; i++) {
				bannerdisk.append('<span></span>');
			};

			bannerBox.find('.bannerjs-item').each(function(i) {
				$(this).addClass('item-' + [i]).css({
					'width': [bannerBox.width() / options.bannerShow - (options.bannerPadding * 2)],
					'margin': options.bannerPadding
				});
			});

			var develwit = [bannerlist.find('.bannerjs-item').width() + (options.bannerPadding * 2)],
				diskItemMR = parseInt(bannerdisk.find('span').css("marginRight").replace('px', '')),
				diskItemBR = parseInt(bannerdisk.find('span').css('border-width').replace('px', '')),
				diskItemWH = bannerdisk.find('span').width(),
				diskWidth = [bannerdisk.find('span').length] * [diskItemWH+diskItemMR+(diskItemBR*2)],
				mousenum = Math.ceil(devellen / bannergo);

			bannerlist.width(devellen * develwit);
			bannerdisk.width(diskWidth).css('margin-left', -(diskWidth / 2)).find('span').eq(0).addClass('active');

			if(options.bannerShow == 1){
				bannerlist.height( bannerlist.find('.bannerjs-item').eq(0).height() + (options.bannerPadding * 2) );
			};

			function GoNext() {
				if (!bannerlist.is(':animated')) {
					if (bannerType == mousenum) {
						bannerType = 1;
						var itemH = bannerlist.find(bannerlist.find('.bannerjs-item')).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: '0px' , height: itemH + (options.bannerPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: '0px' , height: 'auto'}, 600);
						}
						bannerlist.find(bannerlist.find('.bannerjs-item')).removeClass('active').eq(bannerType - 1).addClass('active');
						bannerdisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					} else {
						bannerType++;
						var itemH = bannerlist.find(bannerlist.find('.bannerjs-item')).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: '-=' + develwit * bannergo , height : itemH + (options.bannerPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: '-=' + develwit * bannergo , height : 'auto'}, 600);
						}
						bannerlist.find(bannerlist.find('.bannerjs-item')).removeClass('active').eq(bannerType - 1).addClass('active');
						bannerdisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					}
				}
			};

			function GoPrev() {
				if (!bannerlist.is(':animated')) {
					if (bannerType == 1) {
						bannerType = mousenum;
						var itemH = bannerlist.find(bannerlist.find('.bannerjs-item')).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: -develwit * (mousenum - 1) * bannergo , height: itemH + (options.bannerPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: -develwit * (mousenum - 1) * bannergo , height: 'auto'}, 600);
						}
						bannerlist.find(bannerlist.find('.bannerjs-item')).removeClass('active').eq(bannerType - 1).addClass('active');
						bannerdisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					} else {
						bannerType--;
						var itemH = bannerlist.find(bannerlist.find('.bannerjs-item')).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: '+=' + develwit * bannergo , height : itemH + (options.bannerPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: '+=' + develwit * bannergo , height : 'auto'}, 600);
						}
						bannerlist.find(bannerlist.find('.bannerjs-item')).removeClass('active').eq(bannerType - 1).addClass('active');
						bannerdisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					}
				}
			};

			if (options.bannerauto == true) {
				setInterval(function() {
					GoNext()
				}, options.autoTime);
			} else {};

			if (options.bannerWheel == true) {
				bannerBox.mousewheel(function(event, delta) {
					event.stopPropagation();
					event.preventDefault();
					if (delta === 1) {
						GoPrev();
					} else {
						GoNext();
					}
				});
			} else {};

			if(options.bannerArrow == true){
				bannerBox.hover(function() {
					$(this).find('span.goprev , span.gonext').stop(true, false).fadeIn();
				}, function() {
					$(this).find('span.goprev , span.gonext').fadeOut();
				});
				options.goNext.click(function(event) {
					GoNext();
				});
				options.goPrev.click(function(event) {
					GoPrev();
				});
			};

			if (options.bannerDisk == true) {
				bannerdisk.find('span').click(function(event) {
					var diskline = $(this).index();
					bannerdisk.find('span').removeClass('active');
					$(this).addClass('active');
					bannerlist.find('.bannerjs-item').removeClass('active').eq(diskline).addClass('active');
					bannerType = [diskline + 1];
					bannerlist.animate({
						left: -  diskline * develwit
					}, 600);
				});

			} else {
				bannerdisk.hide();
			};
		});
	};
})(jQuery);
