jQuery(function($){JBZoo.widget('HyperPC.ScrollableList',{},{eventTimer:0,resizeTimer:0,media:-1,init:function($this){$(window).on('resize',function(e){clearTimeout($this.resizeTimer);$this.resizeTimer=setTimeout(function(){$this._update($this);},250);});$this._update($this);if(typeof $this.el.attr('uk-tab')!=='undefined'){var connectedEl;if(UIkit.tab($this.el).connect.indexOf('~')>-1){connectedEl=$this.el.find((UIkit.tab($this.el).connect));}else{connectedEl=$((UIkit.tab($this.el).connect));}connectedEl.eq(0).on('shown',function(){$this._update($this);});}},_update:function($this){if($this.el[0].offsetWidth>0){if($this._checkMedia($this)){$this.el.addClass('tm-scrollable-list').children().addClass('tm-scrollable-list__item');setTimeout(function(){$this._goToActive($this);},50)}else{$this.el.removeClass('tm-scrollable-list').children().removeClass('tm-scrollable-list__item');}if(!$this._isOverflowed($this)){$this.el.removeClass('tm-scrollable-list').children().removeClass('tm-scrollable-list__item');}UIkit.update(element=$this.el,event='update');}},_goToActive:function($this){if($this._getActiveItem($this).length<1||!$this._isOverflowed($this)){return;}var activeEl=$this._getActiveItem($this),activeWidth=activeEl.width(),wrapperWidth=$this.el.width(),offsetLeft=activeEl.index()>0?activeEl[0].offsetLeft-activeEl.siblings().eq(0)[0].offsetLeft:activeEl[0].offsetLeft;targetOffset=offsetLeft+(activeWidth-wrapperWidth)/2;$this.el.animate({scrollLeft:targetOffset},250);},_getActiveItem:function($this){var activeItem=$this.$('[class*="--selected"], [class*="uk-active"]');if(!activeItem.is('.tm-scrollable-list__item')){activeItem=activeItem.closest('.tm-scrollable-list__item');}return activeItem;},_checkMedia:function($this){if(typeof $this.el.data('media')==='undefined'||$this.media===0){return true;}if($this.media===-1){if(!isNaN(parseInt($this.el.data('media'),10))){$this.media=parseInt($this.el.data('media'),10);}else{$this.media=0;return true;}}return window.matchMedia('(max-width: '+$this.media+'px)').matches;},_isOverflowed:function($this){if($this.el[0].offsetWidth<$this.el[0].scrollWidth){return true;}return false;},'active {element}':function(e,$this){clearTimeout($this.eventTimer);$this.eventTimer=setTimeout(function(){$this._update($this);},250);},'shown {closest .uk-switcher}':function(e,$this){$this._update($this);},'afterFilter {closest [uk-filter]}':function(e,$this){$this._update($this);}});});