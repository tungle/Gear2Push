/*
  * Copyright (c) 2013 Samsung Electronics Co., Ltd
  *
  * Licensed under the Flora License, Version 1.1 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://floralicense.org/license/
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

;(function(window, undefined) {
	var ns = tau;

( function ( ns, window, undefined) {
	

	if (ns.Swipelist ) {
		return;
	}

var eventType = {
		LEFT: "swipelist.left",
		RIGHT: "swipelist.right"
},

SwipeList = function ( elem, options ){
	this._create( elem, options );
	return this;
};

SwipeList.prototype = {
	_create: function( elem, options ) {
		var page;

		// elem argument is a swipelist widget element
		this.listElement = elem;
		page = this._findActivePage( this.listElement );

		this.contentElement = options.scrollableElement ? options.scrollableElement : this._findScrollableElement( this.listElement );
		this.swipelistElement = page.getElementsByClassName( "ui-swipelist" )[0];

		this.leftElement = options.left ? page.getElementsByClassName( "ui-swipelist-left" )[0] : undefined;
		this.rightElement = options.right ? page.getElementsByClassName( "ui-swipelist-right" )[0] : undefined;

		this.activeElement = null;
		this.activeTarget = null;

		this.startX = 0;

		this.options = {};

		this._interval = 0;

		this._cancelled = false;
		this._dragging = false;
		this._animating = false;

		this.swipelistElementStyle = this.swipelistElement ? this.swipelistElement.style : undefined;
		this.leftElementStyle = this.leftElement ? this.leftElement.style : undefined;
		this.rightElementStyle = this.rightElement ? this.rightElement.style : undefined;

		this._initOptions( options );
		this._init();
		this._bindEvents();

	},

	_init: function() {
		if ( this.swipelistElement ) {
			this.swipelistElementStyle.display = "none";
			this.swipelistElementStyle.background = "transparent";
			this.swipelistElementStyle.width = window.innerWidth + "px";
			this.swipelistElementStyle.height = window.innerHeight + "px";
		}

		if ( this.leftElementStyle ) {
			// Left element existed
			this.leftElementStyle.display = "none";
			this.leftElementStyle.background = "-webkit-linear-gradient(left, " + this.options.ltrStartColor + " 0%, " + this.options.ltrEndColor + " 0%)"; // Default color
		}
		if ( this.rightElementStyle ) {
			// Right element existed
			this.rightElementStyle.display = "none";
			this.rightElementStyle.background = "-webkit-linear-gradient(right, " + this.options.rtlStartColor + " 0%, " + this.options.rtlEndColor + " 0%)"; // Default color
		}

	},

	_initOptions: function( options ){
		this.options = {
			threshold: 30,
			animationThreshold: 150,
			animationDuration: 200,
			animationInterval: 8,
			ltrStartColor: "#62a917",
			ltrEndColor: "#58493a",
			rtlStartColor: "#eaa317",
			rtlEndColor: "#58493a"
		};
		this.setOptions( options );
	},

	_findActivePage: function( elem ) {
		while ( elem && !elem.className.match( "ui-page-active" ) ) {
			elem = elem.parentNode;
		}
		return elem;
	},

	_findScrollableElement: function( elem ) {
		while ( !( elem.scrollHeight > elem.offsetHeight || elem.scrollWidth > elem.offsetWidth ) ) {
			elem = elem.parentNode;
		}
		return elem;
	},

	setOptions: function ( options ) {
		ns.extendObject( this.options, options );
	},

	_bindEvents: function( ) {

		if ("ontouchstart" in window) {
			this.listElement.addEventListener( "touchstart", this );
			this.listElement.parentNode.addEventListener( "touchmove", this );
			this.listElement.parentNode.addEventListener( "touchend", this );
		} else {
			this.listElement.addEventListener( "mousedown", this );
			this.listElement.parentNode.addEventListener( "mousemove", this );
			this.listElement.parentNode.addEventListener( "mouseup", this );
		}

		this.contentElement.addEventListener( "scroll", this);
		document.addEventListener( "touchcancel", this );
	},

	_unbindEvents: function() {

		if ("ontouchstart" in window) {
			this.listElement.removeEventListener( "touchstart", this);
			this.listElement.removeEventListener( "touchmove", this);
			this.listElement.removeEventListener( "touchend", this);
		} else {
			this.listElement.removeEventListener( "mousedown", this);
			this.listElement.removeEventListener( "mousemove", this);
			this.listElement.removeEventListener( "mouseup", this);
		}

		this.contentElement.removeEventListener( "scroll", this );
		document.removeEventListener( "touchcancel", this );
	},

	handleEvent: function( event ) {

		var pos = this._getPointPositionFromEvent( event );

		switch (event.type) {
		case "mousedown":
		case "touchstart":
			this._start( event, pos );
			break;
		case "mousemove":
		case "touchmove":
			this._move( event, pos );
			this._preventScroll( event );
			break;
		case "mouseup":
		case "touchend":
			this._end( event );
			break;
		case "touchcancel":
		case "scroll":
			this._cancel();
			break;
		}
	},

	_getPointPositionFromEvent: function ( ev ) {
		var multiTouchThreshold = 1;
		if(ev.type === "touchend") {
			multiTouchThreshold = 0;
		}
		if ( ev.touches && ev.touches.length > multiTouchThreshold) {
			this._multitouch = true;
		} else {
			this._multitouch = false;
		}
		return ev.type.search(/^touch/) !== -1 && ev.touches && ev.touches.length ?
				{x: ev.touches[0].clientX, y: ev.touches[0].clientY} :
				{x: ev.clientX, y: ev.clientY};
	},

	_translate: function( activeElementStyle, translateX, anim ) {
		var deltaX = translateX / window.innerWidth * 100,
			self = this,
			fromColor, toColor, prefix;

		if ( this.options.left && translateX > 0 ){
			// left
			fromColor = self.options.ltrStartColor;
			toColor = self.options.ltrEndColor;
			prefix = "left";
		} else if ( this.options.right && translateX < 0 ) {
			fromColor = self.options.rtlStartColor;
			toColor = self.options.rtlEndColor;
			prefix = "right";
			deltaX = Math.abs( deltaX );
		}
		( function animate() {
			activeElementStyle.background = "-webkit-linear-gradient("+ prefix + ", " + fromColor + " 0%, " + toColor +" " + deltaX + "%)";
			if ( anim && deltaX <= self.options.animationDuration ){
				self._animating = true;
				deltaX += self.options.animationInterval;
				window.webkitRequestAnimationFrame( animate );
			} else if ( anim && deltaX >= self.options.animationDuration ) {
				self._animating = false;
				self._transitionEnd();
			}
		} ) ( );
	},

	_fireEvent: function( eventName, detail ) {
		ns.fireEvent( this.listElement, eventName, detail );
	},

	_start: function( e, pos ) {
		var targetWidth, targetHeight;

		this._dragging = false;
		this._cancelled = false;

		this.activeTarget = e.target;
		targetWidth = this.activeTarget.offsetWidth + "px";
		targetHeight = this.activeTarget.offsetHeight + "px";

		if ( this.activeTarget ) {
			if ( this.options.left ) {
				this.leftElementStyle.width = targetWidth;
				this.leftElementStyle.height = targetHeight;
			}
			if ( this.options.right ) {
				this.rightElementStyle.width = targetWidth;
				this.rightElementStyle.height = targetHeight;
			}
			this.startX = pos.x;
			this.startY = pos.y; // This code will be deleted when apply to the gesture module of tau.
			this._dragging = true;
		}
	},

	_move: function( e, pos ) {
		var activeElementStyle, translateX;

		if ( !this._dragging || this._cancelled ){
			return;
		}

		this._interval = pos.x - this.startX;

		if ( this.options.left && this._interval > 0 ) {
			if ( this.options.right ) {
				this.rightElementStyle.display = "none";
			}
			this.activeElement = this.leftElement;
			activeElementStyle = this.leftElementStyle;
			translateX = this._interval;

		} else if ( this.options.right && this._interval < 0 ){
			if ( this.options.left ) {
				this.leftElementStyle.display = "none";
			}
			this.activeElement = this.rightElement;
			activeElementStyle = this.rightElementStyle;
			translateX = this._interval;
		}

		if ( Math.abs( this._interval ) > this.options.threshold ) {
			activeElementStyle.top = this.activeTarget.offsetTop - this.contentElement.scrollTop + "px";
			activeElementStyle.display = "block";
			this.swipelistElementStyle.display = "block"; // wrapper element
			this._translate( activeElementStyle, translateX, false );
			e.preventDefault();
		}
	},

	_end: function( e ) {
		if ( e.target !== this.activeTarget ) {
			e.preventDefault();
			return;
		}

		if ( !this._dragging || this._cancelled ){
			return;
		}

		if ( this.options.left && this._interval > this.options.animationThreshold ) {
			this._fire( eventType.LEFT );
		} else if ( this.options.right && this._interval < -this.options.animationThreshold ) {
			this._fire( eventType.RIGHT );
		} else {
			this._hide();
		}
		this._dragging = false;
	},

	_fire: function( type ) {
		if ( type === eventType.LEFT ) {
			this._translate( this.leftElementStyle, this._interval, true );
		} else if ( type === eventType.RIGHT ) {
			this._translate( this.rightElementStyle, this._interval, true );
		}
	},

	_transitionEnd: function() {
		this._hide();
		if ( this.options.left && this.activeElement === this.leftElement ) {
			this._fireEvent( eventType.LEFT );
		} else if ( this.options.right && this.activeElement === this.rightElement ) {
			this._fireEvent( eventType.RIGHT );
		}
	},

	_preventScroll: function( e ) {
		// Prevent bouncing effect when a swipelist animating
		if ( this._animating ) {
			e.preventDefault();
		}
	},

	_cancel: function( ) {
		this._dragging = false;
		this._cancelled = true;
		this._hide();
	},

	_hide: function() {
		this.swipelistElementStyle.display = "none";
		this.activeElement.style.display = "none";
	},

	destroy: function() {
		this._unbindEvents();
		this.contentElement = null;
		this.swipelistElement = null;
		this.listElement = null;
		this.leftElement = null;
		this.rightElement = null;
		this.activeElement = null;
		this.activeTarget = null;

		this.swipelistElementStyle = null;
		this.leftElementStyle = null;
		this.rightElementStyle = null;

		this.startX = null;
		this.options = null;
		this.gesture = null;

		this._cancelled = null;
		this._dragging = null;
		this._animating = null;

	}
};

ns.SwipeList = SwipeList;

} ( ns, window ) );


})(this);