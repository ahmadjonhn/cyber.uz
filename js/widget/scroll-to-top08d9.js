jQuery(function($){JBZoo.widget('HyperPC.ScrollToTop',{},{offset:0,shown:false,lastScrollPos:0,init:function($this){UIkit.scroll($this.el,{offset:0});$(window).on('scroll',function(){if(window.pageYOffset>150){$this.shown||($this.el.removeAttr('hidden'),$this.shown=true);}else if(!$this.el.hasClass('tm-scroll-totop--back')){$this.shown&&($this.el.attr('hidden','hidden'),$this.shown=false);}if($this.offset<window.pageYOffset&&$this.offset>150&&$this.el.hasClass('tm-scroll-totop--back')){$this.el.removeClass('tm-scroll-totop--back').find('[uk-icon]').attr('uk-icon','chevron-up');$this.lastScrollPos=0;UIkit.scroll($this.el,{offset:0});}$this.offset=window.pageYOffset;});},'click {element}':function(e,$this){if($this.el.hasClass('tm-scroll-totop--back')){$this.el.one('scrolled',function(){$this.el.removeClass('tm-scroll-totop--back').find('[uk-icon]').attr('uk-icon','chevron-up');UIkit.scroll($this.el,{offset:0});$this.lastScrollPos=0;});}else{$this.lastScrollPos=window.pageYOffset;$this.el.addClass('tm-scroll-totop--back');$this.el.find('[uk-icon]').attr('uk-icon','chevron-down');$this.el.one('scrolled',function(){UIkit.scroll($this.el,{offset:-$this.lastScrollPos});});}}});});