jQuery(function($){JBZoo.widget('HyperPC.LabelInfield',{},{init:function($this){$this.el.find('input, textarea').each(function(){if($(this).val()===''){$this.el.addClass('isEmpty');}});$this.el.on('input propertychanged','textarea',function(e){$this._handleTextareaInputPropertychanged(e,$this)});},_handleTextareaInputPropertychanged:function(e,$this){if(e.target.clientHeight<e.target.scrollHeight){$this.el.addClass('hasScrollbar');}else{$this.el.removeClass('hasScrollbar');}},'click label':function(e,$this){if($this.el.is(':not(.isFocused)')){$this.el.find('input, textarea').trigger('focus');}},'focusin input, textarea':function(e,$this){$this.el.addClass('isFocused');},'focusout input, textarea':function(e,$this){$this.el.removeClass('isFocused');if($(e.target).val()===''){$this.el.addClass('isEmpty');}else{$this.el.removeClass('isEmpty');}},});});