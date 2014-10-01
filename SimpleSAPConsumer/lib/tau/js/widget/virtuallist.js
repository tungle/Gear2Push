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

(function(window, document, undefined) {

var ns = window.ej = window.ej || {},
	nsConfig = window.ejConfig = window.ejConfig || {};
nsConfig.rootNamespace = 'ej';
nsConfig.fileName = 'tau';
/*global window, console, define, ns, nsConfig */
/*jslint plusplus:true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * Ej core namespace
 * @class ns
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 */
(function (window, document, ns, nsConfig) {
	
			var idNumberCounter = 0,
			currentDate = +new Date(),
			slice = [].slice,
			rootNamespace = nsConfig.rootNamespace,
			fileName = nsConfig.fileName,
			infoForLog = function (args) {
				var dateNow = new Date();
				args.unshift('[' + rootNamespace + '][' + dateNow.toLocaleString() + ']');
			};

		/**
		* Return unique id
		* @method getUniqueId
		* @static
		* @return {string}
		* @memberOf ns
		*/
		ns.getUniqueId = function () {
			return rootNamespace + "-" + this.getNumberUniqueId() + "-" + currentDate;
		};

		/**
		* Return unique id
		* @method getNumberUniqueId
		* @static
		* @return {number}
		* @memberOf ns
		*/
		ns.getNumberUniqueId = function () {
			return idNumberCounter++;
		};

		/**
		* logs supplied messages/arguments
		* @method log
		* @static
		* @param {...*} argument
		* @memberOf ns
		*/
		ns.log = function (argument) {
			var args = slice.call(arguments);
			infoForLog(args);
			if (console) {
				console.log.apply(console, args);
			}
		};

		/**
		* logs supplied messages/arguments ad marks it as warning
		* @method warn
		* @static
		* @param {...*} argument
		* @memberOf ns
		*/
		ns.warn = function (argument) {
			var args = slice.call(arguments);
			infoForLog(args);
			if (console) {
				console.warn.apply(console, args);
			}
		};

		/**
		* logs supplied messages/arguments and marks it as error
		* @method error
		* @static
		* @param {...*} argument
		* @memberOf ns
		*/
		ns.error = function (argument) {
			var args = slice.call(arguments);
			infoForLog(args);
			if (console) {
				console.error.apply(console, args);
			}
		};

		/**
		* get from ejConfig
		* @method get
		* @param {string} key
		* @param {Mixed} defaultValue
		* @return {Mixed}
		* @static
		* @memberOf ns
		*/
		ns.get = function (key, defaultValue) {
			return nsConfig[key] === undefined ? defaultValue : nsConfig[key];
		};

		/**
		* set in ejConfig
		* @method set
		* @param {string} key
		* @param {Mixed} value
		* @static
		* @memberOf ns
		*/
		ns.set = function (key, value) {
			nsConfig[key] = value;
		};

		/**
		 * Return path for framework script file.
		 * @method getFrameworkPath
		 * @returns {?string}
		 * @memberOf ns
		 */
		ns.getFrameworkPath = function () {
			var scripts = document.getElementsByTagName('script'),
				countScripts = scripts.length,
				i,
				url,
				arrayUrl,
				count;
			for (i = 0; i < countScripts; i++) {
				url = scripts[i].src;
				arrayUrl = url.split('/');
				count = arrayUrl.length;
				if (arrayUrl[count - 1] === fileName + '.js' || arrayUrl[count - 1] === fileName + '.min.js') {
					return arrayUrl.slice(0, count - 1).join('/');
				}
			}
			return null;
		};

		}(window, window.document, ns, nsConfig));

/*global window, define */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (ns) {
	
				/** @namespace ns.widget */
			ns.widget = ns.widget || {};
			}(window.ej));

/*global window, define */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Tizen Advanced UI Framework main namespace
 * @class tau
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, document) {
	
				var orgTau,
				tau = {
					/**
					 * revert changes in gear namespace make by framework and return framework object
					 * @method noConflict
					 * @return {Object}
					 * @memberOf tau
					 */
					noConflict: function () {
						var newTau = window.tau;
						window.tau = orgTau;
						orgTau = null;
						return newTau;
					},
					/**
					 * Return original window.gear object;
					 * @method getOrginalNamespace
					 * @return {Object}
					 * @memberOf tau
					 */
					getOrginalNamespace: function () {
						return orgTau;
					},
					/**
					 * Create new window.gear object;
					 * @method createNewNamespace
					 * @memberOf tau
					 */
					createNewNamespace: function() {
						orgTau = orgTau || window.tau;
						window.tau = tau;
					}
				};
				tau.createNewNamespace();
				document.addEventListener('mobileinit', tau.createNewNamespace, false);
			}(window, document));

/*global window, define */
/*jslint nomen: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Utils
 * Namespace for all utils class
 * @class ns.utils
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (window, ns) {
	
				var currentFrame = null,
				/**
				 * requestAnimationFrame function
				 * @method requestAnimationFrame
				 * @return {Function}
				 * @static
				 * @memberOf ns.utils
				*/
				requestAnimationFrame = (window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function (callback) {
						currentFrame = window.setTimeout(callback.bind(callback, +new Date()), 1000 / 60);
					}).bind(window),
				/**
				* Class with utils functions
				* @class ns.utils
				*/
				/** @namespace ns.utils */
				utils = ns.utils || {};

			utils.requestAnimationFrame = requestAnimationFrame;

			/**
			* cancelAnimationFrame function
			* @method cancelAnimationFrame
			* @return {Function}
			* @memberOf ns.utils
			* @static
			*/
			utils.cancelAnimationFrame = (window.cancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					function () {
						// propably wont work if there is any more than 1
						// active animationFrame but we are trying anyway
						window.clearTimeout(currentFrame);
					}).bind(window);

			/**
			 * Method make asynchronous call of function
			 * @method async
			 * @inheritdoc #requestAnimationFrame
			 * @memberOf ns.utils
			 * @static
			 */
			utils.async = requestAnimationFrame;

			/**
			* Checks if specified string is a number or not
			* @method isNumber
			* @return {boolean}
			* @memberOf ns.utils
			* @static
			*/
			utils.isNumber = function (query) {
				var parsed = parseFloat(query);
				return !isNaN(parsed) && isFinite(parsed);
			};

			ns.utils = utils;
			}(window, ns));

/*global window, define, CustomEvent */
/*jslint nomen: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * Utils class with events functions
 * @class ns.utils.events
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (ns) {
	
				var events = {
				/**
				* @method trigger
				* Triggers custom event on element
				* The return value is false, if at least one of the event
				* handlers which handled this event, called preventDefault.
				* Otherwise it returns true.
				* @param {HTMLElement} element
				* @param {string} type
				* @param {?*} [data=null]
				* @param {boolean=} [bubbles=true]
				* @param {boolean=} [cancelable=true]
				* @return {boolean=}
				* @memberOf ns.utils.events
				* @static
				*/
				trigger: function ejUtilsEvents_trigger(element, type, data, bubbles, cancelable) {
					var evt = new CustomEvent(type, {
							"detail": data,
							//allow event to bubble up, required if we want to allow to listen on document etc
							bubbles: typeof bubbles === "boolean" ? bubbles : true,
							cancelable: typeof cancelable === "boolean" ? cancelable : true
						});
										return element.dispatchEvent(evt);
				},

				/**
				 * Prevent default on original event
				 * @method preventDefault
				 * @param {CustomEvent} event
				 * @memberOf ns.utils.events
				 * @static
				 */
				preventDefault: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;
					if (originalEvent && originalEvent.preventDefault) {
						originalEvent.preventDefault();
					}
					event.preventDefault();
				},

				/**
				* Stop event propagation
				* @method stopPropagation
				* @param {CustomEvent} event
				* @memberOf ns.utils.events
				* @static
				*/
				stopPropagation: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;
					if (originalEvent && originalEvent.stopPropagation) {
						originalEvent.stopPropagation();
					}
					event.stopPropagation();
				},

				/**
				* Stop event propagation immediately
				* @method stopImmediatePropagation
				* @param {CustomEvent} event
				* @memberOf ns.utils.events
				* @static
				*/
				stopImmediatePropagation: function (event) {
					var originalEvent = event._originalEvent;
					// @todo this.isPropagationStopped = returnTrue;
					if (originalEvent && originalEvent.stopImmediatePropagation) {
						originalEvent.stopImmediatePropagation();
					}
					event.stopImmediatePropagation();
				},

				/**
				 * Return document relative cords for event
				 * @method documentRelativeCoordsFromEvent
				 * @param {Event} event
				 * @return {Object}
				 * @return {number} return.x
				 * @return {number} return.y
				 * @memberOf ns.utils.events
				 * @static
				 */
				documentRelativeCoordsFromEvent: function(event) {
					var _event = event ? event : window.event,
							client = {
								x: _event.clientX,
								y: _event.clientY
							},
							page = {
								x: _event.pageX,
								y: _event.pageY
							},
							posX = 0,
							posY = 0,
							touch0,
							body = document.body,
							documentElement = document.documentElement;

						if (event.type.match(/^touch/)) {
							touch0 = _event.originalEvent.targetTouches[0];
							page = {
								x: touch0.pageX,
								y: touch0.pageY
							};
							client = {
								x: touch0.clientX,
								y: touch0.clientY
							};
						}

						if (page.x || page.y) {
							posX = page.x;
							posY = page.y;
						}
						else if (client.x || client.y) {
							posX = client.x + body.scrollLeft + documentElement.scrollLeft;
							posY = client.y + body.scrollTop  + documentElement.scrollTop;
						}

						return { x: posX, y: posY };
				},

				/**
				 * Return target relative cords for event
				 * @method targetRelativeCoordsFromEvent
				 * @param {Event} event
				 * @return {Object}
				 * @return {number} return.x
				 * @return {number} return.y
				 * @memberOf ns.utils.events
				 * @static
				 */
				targetRelativeCoordsFromEvent: function(event) {
					var target = event.target,
						cords = {
							x: event.offsetX,
							y: event.offsetY
						};

					if (cords.x === undefined || isNaN(cords.x) ||
						cords.y === undefined || isNaN(cords.y)) {
						cords = events.documentRelativeCoordsFromEvent(event);
						cords.x -= target.offsetLeft;
						cords.y -= target.offsetTop;
					}

					return cords;
				},

				/**
				 * Add event listener to element
				 * @method on
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @memberOf ns.utils.events
				 * @static
				 */
				on: function(element, type, listener, useCapture) {
					element.addEventListener(type, listener, useCapture || false);
				},

				/**
				 * Remove event listener to element
				 * @method off
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @memberOf ns.utils.events
				 * @static
				 */
				off: function(element, type, listener, useCapture) {
					element.removeEventListener(type, listener, useCapture || false);
				},

				/**
				 * Add event listener to element
				 * @method onMany
				 * @param {HTMLCollection} elements
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @memberOf ns.utils.events
				 * @static
				 */
				onMany: function(elements, type, listener, useCapture) {
					var i,
						length = elements.length;
					for (i = 0; i < length; i++) {
						events.on(elements[i], type, listener, useCapture);
					}
				},

				/**
				 * Remove event listener to element
				 * @method offMany
				 * @param {HTMLCollection} elements
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @memberOf ns.utils.events
				 * @static
				 */
				offMany: function(elements, type, listener, useCapture) {
					var i,
						length = elements.length;
					for (i = 0; i < length; i++) {
						events.off(elements[i], type, listener, useCapture);
					}
				},

				/**
				 * Add event listener to element only for one trigger
				 * @method one
				 * @param {HTMLElement} element
				 * @param {string} type
				 * @param {Function} listener
				 * @param {boolean} [useCapture=false]
				 * @memberOf ns.utils.events
				 * @static
				 */
				one: function(element, type, listener, useCapture) {
					var callback = function() {
						events.off(element, type, callback, useCapture);
						listener.apply(this, arguments);
					};
					events.on(element, type, callback, useCapture);
				}
			};
			ns.utils.events = events;
			}(window.ej));

/*global window, define, ns */
/*jslint nomen: true, plusplus: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/

/**
 * Main class with engine of library
 * @class ns.engine
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Michal Szepielak <m.szepielak@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Przemyslaw Ciezkowski <p.ciezkowski@samsung.com>
 */
(function (window, document, ns) {
	
				/**
			 * @method slice Array.slice
			 * @private
			 * @static
			 * @memberOf ns.engine
			 */
			var slice = [].slice,
				/**
				 * @property {Object} eventUtils {@link ns.utils.events}
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				eventUtils = ns.utils.events,
				/**
				 * @property {Object} widgetDefs Object with widgets definitions
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				widgetDefs = {},
				/**
				 * @property {Object} widgetBindingMap Object with widgets bindings
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				widgetBindingMap = {},
				location = window.location,
				/**
				 * @property {boolean} justBuild engine mode, if true then engine only builds widgets
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				justBuild = location.hash === "#build",
				/**
				 * Returns trimmed value
				 * @method trim
				 * @param {string} value
				 * @return {string} trimmed string
				 * @static
				 * @private
				 * @memberOf ns.engine
				 */
				trim = function (value) {
					return value.trim();
				},
				/**
				 * @property {string} [TYPE_STRING="string"] local cache of string type name
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				TYPE_STRING = "string",
				/**
				 * @property {string} [TYPE_FUNCTION="function"] local cache of function type name
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				TYPE_FUNCTION = "function",
				/**
				 * @property {string} [STRING_TRUE="true"] local cache of string "true"
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				STRING_TRUE = "true",
				/**
				 * @property {string} [DATA_BUILT="data-ej-built"] attribute informs that widget id build
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				DATA_BUILT = "data-ej-built",
				/**
				 * @property {string} [DATA_NAME="data-ej-name"] attribute contains widget name
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				DATA_NAME = "data-ej-name",
				/**
				 * @property {string} [DATA_BOUND="data-ej-bound"] attribute informs that widget id bound
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				DATA_BOUND = "data-ej-bound",
				/**
				 * @property {string} [DATA_SELECTOR="data-ej-selector"] attribute contains widget selector
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				DATA_SELECTOR = "data-ej-selector",
				/**
				 * @property {string} [querySelectorWidgets="*[data-ej-built=true][data-ej-selector][data-ej-name]:not([data-ej-bound])"] query selector for all widgets which are built but not bound
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				querySelectorWidgets = "*[" + DATA_BUILT + "=true][" + DATA_SELECTOR + "][" + DATA_NAME + "]:not([" + DATA_BOUND + "])",
				/**
				 * @property {string} [excludeBuiltAndBound=":not([data-ej-built]):not([data-ej-bound])"] attribute contains widget binding
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				excludeBuiltAndBound = ":not([" + DATA_BUILT + "]):not([" + DATA_BOUND + "])",
				/**
				 * @property {string} [EVENT_BOUND="bound"] name of bound event
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */				
				EVENT_BOUND = "bound",
				/**
				 * @property {string} [EVENT_WIDGET_BUILT="widgetbuilt"] name of widget built event
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				EVENT_WIDGET_BUILT = "widgetbuilt",
				/**
				 * @property {string} [EVENT_WIDGET_BOUND="widgetbound"] name of widget bound event
				 * @private
				 * @static
				 * @readonly
				 * @memberOf ns.engine
				 */
				EVENT_WIDGET_BOUND = "widgetbound",
				engine,
				/**
				 * @property {Object} router Router object
				 * @private
				 * @static
				 * @memberOf ns.engine
				 */
				router;

			/**
			* Function to define widget
			* @method defineWidget
			* @param {string} name
			* @param {string} binding
			* @param {string} selector
			* @param {Array} methods
			* @param {Object} widgetClass
			* @param {string} [namespace]
			* @param {boolean} [redefine]
			* @param {boolean} [widgetNameToLowercase = true]
			* @return {boolean}
			* @memberOf ns.engine
			* @static
			*/
			function defineWidget(name, binding, selector, methods, widgetClass, namespace, redefine, widgetNameToLowercase) {
				// @TODO parameter binding is unused, can be removed
				var definition;
				if (!widgetDefs[name] || redefine) {
										methods = methods || [];
					methods.push("destroy", "disable", "enable", "option", "refresh", "value");
					definition = {
						name: name,
						methods: methods,
						selector: selector || "",
						selectors: selector ? selector.split(",").map(trim) : [],
						binding: binding || "",
						widgetClass: widgetClass || null,
						namespace: namespace || "",
						widgetNameToLowercase: widgetNameToLowercase === undefined ? true : !!widgetNameToLowercase
					};

					widgetDefs[name] = definition;
					eventUtils.trigger(document, "widgetdefined", definition, false);
					return true;
				}
								return false;
			}

			/**
			 * Load widget
			 * @method processWidget
			 * @param {Object} definition definition of widget
			 * @param {Object} definition.binding
			 * @param {ns.widget.BaseWidget} definition.widgetClass
			 * @param {string} definition.name
			 * @param {string} template
			 * @param {HTMLElement} element base element of widget
			 * @param {Object} [options] options for widget
			 * @private
			 * @static
			 * @memberOf ns.engine
			 */
			function processWidget(definition, template, element, options) {
									var widgetOptions = options || {},
						createFunction = widgetOptions.create,
						Widget = definition.widgetClass,
						widgetInstance = Widget ? new Widget(element) : false,
						postBuildCallback;

					if (widgetInstance) {
												widgetInstance.configure(definition, element, options);

						if (typeof createFunction === TYPE_FUNCTION) {
							eventUtils.on(element, definition.name.toLowerCase() + "create", createFunction);
						}

						if (element.id) {
							widgetInstance.id = element.id;
						}

						if (element.getAttribute(DATA_BUILT) !== STRING_TRUE) {
							element = widgetInstance.build(template, element);
						}

						if (element) {
							widgetInstance.element = element;

							setBinding(widgetInstance);

							postBuildCallback = function (element) {
								if (justBuild) {
									widgetInstance.bindEvents(element, true);
								} else {
									widgetInstance.init(element);
									widgetInstance.bindEvents(element);
								}
								eventUtils.trigger(element, EVENT_WIDGET_BOUND, widgetInstance, false);
								eventUtils.trigger(document, EVENT_WIDGET_BOUND, widgetInstance);
							}.bind(null, element);

							eventUtils.one(element, EVENT_WIDGET_BUILT, postBuildCallback, true);
							widgetInstance.trigger(EVENT_WIDGET_BUILT, widgetInstance, false);
						} else {
													}
					}
					return widgetInstance.element;
								}

			/**
			* @method Call destroy method of widget and it's child. Remove bindings.
			* @param {HTMLElement|string} element
			* @param {boolean} [childOnly=false] destroy only widget on children elements
			* @static
			* @memberOf ns.engine
			*/
			function destroyWidget(element, childOnly) {
				var widgetInstance,
					childWidgets,
					i;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(element);
				}
				
				// getBinding returns .instance directly in return statement
				// no need to access .instance property manually
				if (!childOnly) {
					widgetInstance = getBinding(element);
					//Destroy widget
					widgetInstance.destroy();
					widgetInstance.trigger("widgetdestroyed");
				}

				//Destroy child widgets, if there something left.
				childWidgets = slice.call(element.querySelectorAll("[" + DATA_BOUND + "='true']"));
				for (i = childWidgets.length - 1; i >= 0; i -= 1) {
					if (childWidgets[i]) {
						destroyWidget(childWidgets[i]);
					}
				}

				removeBinding(element);
			}

			/**
			* Load widgets from data-* definition
			* @method processHollowWidget
			* @param {Object} definition widget definition
			* @param {HTMLElement} element base element of widget
			* @param {Object} [options] options for create widget
			* @return {HTMLElement} base element of widget
			* @private
			* @static
			* @memberOf ns.engine
			*/
			function processHollowWidget(definition, element, options) {
				var name = element.getAttribute(DATA_NAME);
					definition = definition || (name && widgetDefs[name]) || {
						"name": name,
						"selector": element.getAttribute(DATA_SELECTOR),
						"binding": element.getAttribute(DATA_SELECTOR)
					};
				return processWidget(definition, null, element, options);
			}

			/**
			* Build widgets on all children of context element
			* @method createWidgets
			* @static
			* @param {HTMLElement} context base html for create children
			* @memberOf ns.engine
			*/
			function createWidgets(context) {
				var builtWithoutTemplates = slice.call(context.querySelectorAll(querySelectorWidgets)),
					selectorKeys = Object.keys(widgetDefs),
					normal = [],
					i,
					len = selectorKeys.length,
					definition,
					selectors;

				
				// @TODO EXPERIMENTAL WIDGETS WITHOUT TEMPLATE DEFINITION
				builtWithoutTemplates.forEach(processHollowWidget.bind(null, null));

				/* NORMAL */
				for (i = 0; i < len; ++i) {
					definition = widgetDefs[selectorKeys[i]];
					selectors = definition.selectors;
					if (selectors.length) {
						normal = slice.call(context.querySelectorAll(selectors.join(excludeBuiltAndBound + ",") + excludeBuiltAndBound));
						normal.forEach(processHollowWidget.bind(null, definition));
					}
				}

				eventUtils.trigger(document, "built");
				eventUtils.trigger(document, EVENT_BOUND);
							}

			/**
			 * Get binding for element
			 * @method getBinding
			 * @static
			 * @param {HTMLElement|string} element
			 * @return {?Object}
			 * @memberOf ns.engine
			 */
			function getBinding(element) {
				var id = !element || typeof element === TYPE_STRING ? element : element.id,
					binding,
					bindingInstance,
					bindingElement;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(id);
				}

				binding = widgetBindingMap[id];

				if (typeof binding === "object") {
					bindingInstance = binding.instance;
					
					if (bindingInstance.element === element) {
						return bindingInstance;
					}
					// Remove garbage
					if (element) {
						bindingInstance.destroy(element);
					} else {
						bindingInstance.destroy();
					}
				}

				return null;
			}

			/**
			* Set binding of widget
			* @method setBinding
			* @param {ns.widget.BaseWidget} widgetInstance
			* @static
			* @memberOf ns.engine
			*/
			function setBinding(widgetInstance) {
				var id = widgetInstance.id;

				
				widgetBindingMap[id] = {
					"elementId": id,
					"element": widgetInstance.element,
					"binding": widgetInstance.binding,
					"instance": widgetInstance
				};
			}

			/**
			 * Remove binding data attributes for element.
			 * @method removeBindingAttributes
			 * @param {HTMLElement} element
			 * @static
			 * @memberOf ns.engine
			 */
			function removeBindingAttributes(element) {
				element.removeAttribute(DATA_BUILT);
				element.removeAttribute(DATA_BOUND);
				element.removeAttribute(DATA_NAME);
				element.removeAttribute(DATA_SELECTOR);
			}

			/**
			 * Remove binding for widget based on element.
			 * @method removeBinding
			 * @param {HTMLElement|string} element
			 * @return {boolean}
			 * @static
			 * @memberOf ns.engine
			 */
			function removeBinding(element) {
				var id = typeof element === TYPE_STRING ? element : element.id;

				if (typeof element === TYPE_STRING) {
					element = document.getElementById(id);
				}

				if (element) {
					removeBindingAttributes(element);
				}
				if (widgetBindingMap[id]) {
					if (widgetBindingMap[id].element && typeof widgetBindingMap[id].element.setAttribute === TYPE_FUNCTION) {
						removeBindingAttributes(widgetBindingMap[id].element);
					}
					delete widgetBindingMap[id];
					return true;
				}
				return false;
			}

			/**
			 * Handler for event create
			 * @method createEventHandler
			 * @param {Event} event
			 * @static
			 * @memberOf ns.engine
			 */
			function createEventHandler(event) {
				createWidgets(event.target);
			}

			/**
			 * Build first page
			 * @method build
			 * @static
			 * @memberOf ns.engine
			 */
			function build() {
				if (router) {
					eventUtils.trigger(document, "beforerouterinit", router, false);
					router.init(justBuild);
					eventUtils.trigger(document, "routerinit", router, false);
				}
			}

			/**
			 * Method to remove all listeners bound in run
			 * @method stop
			 * @static
			 * @memberOf ns.engine
			 */
			function stop() {
				if (router) {
					router.destroy();
				}
			}
/*
			document.addEventListener(EVENT_BOUND, function () {
				//@TODO dump it to file for faster binding by ids
				window.ejWidgetBindingMap = widgetBindingMap;
			}, false);
*/
			ns.widgetDefinitions = {};
			engine = {
				justBuild: location.hash === "#build",
				/**
				 * @property {Object} dataEj object with names of engine attributes
				 * @property {string} [dataEj.built="data-ej-built"] attribute inform that widget id build
				 * @property {string} [dataEj.name="data-ej-name"] attribute contains widget name
				 * @property {string} [dataEj.bound="data-ej-bound"] attribute inform that widget id bound
				 * @property {string} [dataEj.selector="data-ej-selector"] attribute contains widget selector
				 * @static
				 * @memberOf ns.engine
				 */
				dataEj: {
					built: DATA_BUILT,
					name: DATA_NAME,
					bound: DATA_BOUND,
					selector: DATA_SELECTOR
				},
				destroyWidget: destroyWidget,
				createWidgets: createWidgets,

				/**
				 * Method to get all definitions of widgets
				 * @method getDefinitions
				 * @return {Object}
				 * @static
				 * @memberOf ns.engine
				 */
				getDefinitions: function () {
					return widgetDefs;
				},
				getWidgetDefinition: function (name) {
					return widgetDefs[name];
				},
				defineWidget: defineWidget,
				getBinding: getBinding,
				setBinding: setBinding,
				// @TODO either rename or fix functionally because
				// this method does not only remove binding but
				// actually destroys widget
				removeBinding: removeBinding,

				/**
				* Clear bindings of widgets
				* @method _clearBindings
				* @static
				* @protected
				* @memberOf ns.engine
				*/
				_clearBindings: function () {
					//clear and set references to the same object
					widgetBindingMap = window.ejWidgetBindingMap = {};
				},

				build: build,

				/**
				* Run engine
				* @method run
				* @static
				* @memberOf ns.engine
				*/
				run: function () {
					stop();

					eventUtils.on(document, "create", createEventHandler);

					eventUtils.trigger(document, "mobileinit");

					if (document.readyState === "complete") {
						build();
					} else {
						eventUtils.on(document, "DOMContentLoaded", build.bind(engine));
					}
				},

				/**
				 * Return router
				 * @method getRouter
				 * @return {Object}
				 * @static
				 * @memberOf ns.engine
				 */
				getRouter: function () {
					return router;
				},

				/**
				* Initialize router. This method should be call in file with router class definition.
				* @method initRouter
				* @param {Function} RouterClass Router class
				* @static
				* @memberOf ns.engine
				*/
				initRouter: function (RouterClass) {
					router = new RouterClass();
				},

				/**
				* Build instance of widget and binding events
				* Returns error when empty element is passed
				* @method instanceWidget
				* @param {HTMLElement} element
				* @param {string} name
				* @param {Object} options
				* @return {?Object}
				* @static
				* @memberOf ns.engine
				*/
				instanceWidget: function (element, name, options) {
					var binding = getBinding(element),
						definition;

					if (!element) {
						ns.error("'element' cannot be empty");
						return null;
					}

					if (!binding && widgetDefs[name]) {
						definition = widgetDefs[name];
						element = processHollowWidget(definition, element, options);
						binding = getBinding(element);
					}
					return binding;
				},

				stop: stop,

				/**
				 * Method to change build mode
				 * @method setJustBuild
				 * @param {boolean} newJustBuild
				 * @static
				 * @memberOf ns.engine
				 */
				setJustBuild: function (newJustBuild) {
					// Set location hash to have a consistent behavior
					if(newJustBuild){
						location.hash = "build";
					} else {
						location.hash = "";
					}

					justBuild = newJustBuild;
				},

				/**
				 * Method to get build mode
				 * @method getJustBuild
				 * @return {boolean}
				 * @static
				 * @memberOf ns.engine
				 */
				getJustBuild: function () {
					return justBuild;
				},
				_createEventHandler : createEventHandler
			};
			window.ejWidgetBindingMap = widgetBindingMap;
			ns.engine = engine;
			}(window, window.document, ns));

/*global window, define, ns */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * #Object utilities
 * Namespace with helpers function connected with objects.
 *
 * @class ns.utils.object
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (ns) {
	
	
			var object = {
				/**
				* Copy object to new object
				* @method copy
				* @param {Object} orgObject
				* @return {Object}
				* @static
				* @memberOf ns.utils.object
				*/
				copy: function (orgObject) {
					return object.merge({}, orgObject);
				},

				/**
				* Attach fields from second object to first object.
				* @method merge
				* @param {Object} newObject
				* @param {Object} orgObject
				* @return {Object}
				* @static
				* @memberOf ns.utils.object
				*/
				merge: function (newObject, orgObject) {
					var key;
					for (key in orgObject) {
						if (orgObject.hasOwnProperty(key)) {
							newObject[key] = orgObject[key];
						}
					}
					return newObject;
				},

				/**
				* Attach fields from second and next object to first object.
				* @method multiMerge
				* @param {Object} newObject
				* @param {...Object} orgObject
				* @param {?boolean} [override=true]
				* @return {Object}
				* @static
				* @memberOf ns.utils.object
				*/
				multiMerge: function ( /* newObject, orgObject, override */ ) {
					var newObject, orgObject, override,
						key,
						args = [].slice.call(arguments),
						argsLength = args.length,
						i;
					newObject = args.shift();
					override = true;
					if (typeof arguments[argsLength-1] === "boolean") {
						override = arguments[argsLength-1];
						argsLength--;
					}
					for (i = 0; i < argsLength; i++) {
						orgObject = args.shift();
						if (orgObject !== null) {
							for (key in orgObject) {
								if (orgObject.hasOwnProperty(key) && ( override || newObject[key] === undefined )) {
									newObject[key] = orgObject[key];
								}
							}
						}
					}
					return newObject;
				},

				/**
				 * Function add to Constructor prototype Base object and add to prototype properties and methods from
				 * prototype object.
				 * @method inherit
				 * @param {Function} Constructor
				 * @param {Function} Base
				 * @param {Object} prototype
				 * @static
				 * @memberOf ns.utils.object
				 */
				/* jshint -W083 */
				inherit: function( Constructor, Base, prototype ) {
					var basePrototype = new Base(),
						property,
						value;
					for (property in prototype) {
						if (prototype.hasOwnProperty(property)) {
							value = prototype[property];
							if ( typeof value === "function" ) {
								basePrototype[property] = (function createFunctionWithSuper(Base, property, value) {
									var _super = function() {
										var superFunction = Base.prototype[property];
										if (superFunction) {
											return superFunction.apply(this, arguments);
										}
										return null;
									};
									return function() {
										var __super = this._super,
											returnValue;

										this._super = _super;
										returnValue = value.apply(this, arguments);
										this._super = __super;
										return returnValue;
									};
								}(Base, property, value));
							} else {
								basePrototype[property] = value;
							}
						}
					}

					Constructor.prototype = basePrototype;
					Constructor.prototype.constructor = Constructor;
				}
			};
			ns.utils.object = object;
			}(ns));

/*global define: true, window: true */
/*
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Selectors
 * Utils class with selectors functions
 * @class ns.utils.selectors
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Damian Osipiuk <d.osipiuk@samsung.com>
 */
(function (document, ns) {
	
				/**
			 * @method slice Alias for array slice method
			 * @memberOf ns.utils.selectors
			 * @private
			 * @static
			 */
			var slice = [].slice,
				/**
				 * @method matchesSelectorType
				 * @return {string|boolean}
				 * @memberOf ns.utils.selectors
				 * @private
				 * @static
				 */
				matchesSelectorType = (function () {
					var el = document.createElement("div");

					if (typeof el.webkitMatchesSelector === "function") {
						return "webkitMatchesSelector";
					}

					if (typeof el.mozMatchesSelector === "function") {
						return "mozMatchesSelector";
					}

					if (typeof el.msMatchesSelector === "function") {
						return "msMatchesSelector";
					}

					if (typeof el.matchesSelector === "function") {
						return "matchesSelector";
					}

					return false;
				}());

			/**
			 * Prefix selector with 'data-' and namespace if present
			 * @method getDataSelector
			 * @param {string} selector
			 * @return {string}
			 * @memberOf ns.utils.selectors
			 * @private
			 * @static
			 */
			function getDataSelector(selector) {
				var namespace = ns.get(namespace);
				return '[data-' + (namespace ? namespace + '-' : '') + selector + ']';
			}

			/**
			 * Runs matches implementation of matchesSelector
			 * method on specified element
			 * @method matchesSelector
			 * @param {HTMLElement} element
			 * @param {string} Selector
			 * @return {boolean}
			 * @static
			 * @memberOf ns.utils.selectors
			 */
			function matchesSelector(element, selector) {
				if (matchesSelectorType) {
					return element[matchesSelectorType](selector);
				}
				return false;
			}

			/**
			 * Return array with all parents of element.
			 * @method parents
			 * @param {HTMLElement} element
			 * @return {Array}
			 * @memberOf ns.utils.selectors
			 * @private
			 * @static
			 */
			function parents(element) {
				var items = [],
					current = element.parentNode;
				while (current && current !== document) {
					items.push(current);
					current = current.parentNode;
				}
				return items;
			}

			/**
			 * Checks if given element and its ancestors matches given function
			 * @method closest
			 * @param {HTMLElement} element
			 * @param {Function} testFunction
			 * @return {?HTMLElement}
			 * @memberOf ns.utils.selectors
			 * @static
			 * @private
			 */
			function closest(element, testFunction) {
				var current = element;
				while (current && current !== document) {
					if (testFunction(current)) {
						return current;
					}
					current = current.parentNode;
				}
				return null;
			}

			/**
			 * @method testSelector
			 * @param {string} selector
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @memberOf ns.utils.selectors
			 * @static
			 * @private
			 */
			function testSelector(selector, node) {
				return matchesSelector(node, selector);
			}

			/**
			 * @method testClass
			 * @param {string} className
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @memberOf ns.utils.selectors
			 * @static
			 * @private
			 */
			function testClass(className, node) {
				return node && node.classList && node.classList.contains(className);
			}

			/**
			 * @method testTag
			 * @param {string} tagName
			 * @param {HTMLElement} node
			 * @return {boolean}
			 * @memberOf ns.utils.selectors
			 * @static
			 * @private
			 */
			function testTag(tagName, node) {
				return node.tagName.toLowerCase() === tagName;
			}

			/**
			 * @class ns.utils.selectors
			 */
			ns.utils.selectors = {
				matchesSelector: matchesSelector,

				/**
				* Return array with children pass by given selector.
				* @method getChildrenBySelector
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getChildrenBySelector: function (context, selector) {
					return slice.call(context.children).filter(testSelector.bind(null, selector));
				},

				/**
				* Return array with children pass by given data-namespace-selector.
				* @method getChildrenByDataNS
				* @param {HTMLElement} context
				* @param {string} dataSelector
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getChildrenByDataNS: function (context, dataSelector) {
					return slice.call(context.children).filter(testSelector.bind(null, getDataSelector(dataSelector)));
				},

				/**
				* Return array with children with given class name.
				* @method getChildrenByClass
				* @param {HTMLElement} context
				* @param {string} className
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getChildrenByClass: function (context, className) {
					return slice.call(context.children).filter(testClass.bind(null, className));
				},

				/**
				* Return array with children with given tag name.
				* @method getChildrenByTag
				* @param {HTMLElement} context
				* @param {string} tagName
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getChildrenByTag: function (context, tagName) {
					return slice.call(context.children).filter(testTag.bind(null, tagName));
				},

				/**
				* Return array with all parents of element.
				* @method getParents
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getParents: parents,

				/**
				* Return array with all parents of element pass by given selector.
				* @method getParentsBySelector
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getParentsBySelector: function (context, selector) {
					return parents(context).filter(testSelector.bind(null, selector));
				},

				/**
				* Return array with all parents of element pass by given selector with namespace.
				* @method getParentsBySelectorNS
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getParentsBySelectorNS: function (context, selector) {
					return parents(context).filter(testSelector.bind(null, getDataSelector(selector)));
				},

				/**
				* Return array with all parents of element with given class name.
				* @method getParentsByClass
				* @param {HTMLElement} context
				* @param {string} className
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getParentsByClass: function (context, className) {
					return parents(context).filter(testClass.bind(null, className));
				},

				/**
				* Return array with all parents of element with given tag name.
				* @method getParentsByTag
				* @param {HTMLElement} context
				* @param {string} tagName
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getParentsByTag: function (context, tagName) {
					return parents(context).filter(testTag.bind(null, tagName));
				},

				/**
				* Return first element from parents of element pass by selector.
				* @method getClosestBySelector
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getClosestBySelector: function (context, selector) {
					return closest(context, testSelector.bind(null, selector));
				},

				/**
				* Return first element from parents of element pass by selector with namespace.
				* @method getClosestBySelectorNS
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getClosestBySelectorNS: function (context, selector) {
					return closest(context, testSelector.bind(null, getDataSelector(selector)));
				},

				/**
				* Return first element from parents of element with given class name.
				* @method getClosestByClass
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getClosestByClass: function (context, selector) {
					return closest(context, testClass.bind(null, selector));
				},

				/**
				* Return first element from parents of element with given tag name.
				* @method getClosestByTag
				* @param {HTMLElement} context
				* @param {string} selector
				* @return {HTMLElement}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getClosestByTag: function (context, selector) {
					return closest(context, testTag.bind(null, selector));
				},

				/**
				* Return array of elements from context with given data-selector
				* @method getAllByDataNS
				* @param {HTMLElement} context
				* @param {string} dataSelector
				* @return {Array}
				* @static
				* @memberOf ns.utils.selectors
				*/
				getAllByDataNS: function (context, dataSelector) {
					return slice.call(context.querySelectorAll(getDataSelector(dataSelector)));
				}
			};
			}(window.document, window.ej));

/*global window, define */
/*jslint plusplus: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * # DOM Object
 * Utilities object with function to manipulation DOM
 *
 * # How to replace jQuery methods  by ns methods
 * ## append vs {@link #appendNodes}
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).append( "<span>Test</span>" );

 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.utils.DOM.appendNodes(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And
 *             <span>Test</span>
 *         </div>
 *        <div id="third">Goodbye</div>
 *     </div>
 *
 * ## replaceWith vs {@link #replaceWithNodes}
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $('#second').replaceWith("<span>Test</span>");
 *
 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.utils.DOM.replaceWithNodes(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <span>Test</span>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * ## before vs {@link #insertNodesBefore}
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).before( "<span>Test</span>" );
 *
 * #### ns manipulation
 *
 *     @example
 *     var context = document.getElementById("second"),
 *         element = document.createElement("span");
 *     element.innerHTML = "Test";
 *     ns.utils.DOM.insertNodesBefore(context, element);
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <span>Test</span>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * ## wrapInner vs {@link #wrapInHTML}
 *
 * #### HTML code before manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">And</div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * #### jQuery manipulation
 *
 *     @example
 *     $( "#second" ).wrapInner( "<span class="new"></span>" );
 *
 * #### ns manipulation
 *
 *     @example
 *     var element = document.getElementById("second");
 *     ns.utils.DOM.wrapInHTML(element, "<span class="new"></span>");
 *
 * #### HTML code after manipulation
 *
 *     @example
 *     <div>
 *         <div id="first">Hello</div>
 *         <div id="second">
 *             <span class="new">And</span>
 *         </div>
 *         <div id="third">Goodbye</div>
 *     </div>
 *
 * @class ns.utils.DOM
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (ns) {
	
				ns.utils.DOM = ns.utils.DOM || {};
			}(ns));

/*global window, define */
/*jslint plusplus: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, document, ns) {
	
	

			var selectors = ns.utils.selectors,
				DOM = ns.utils.DOM,
				namespace = "namespace";

			/**
			 * Returns given attribute from element or the closest parent,
			 * which matches the selector.
			 * @method inheritAttr
			 * @memberOf ns.utils.DOM
			 * @param {HTMLElement} element
			 * @param {string} attr
			 * @param {string} selector
			 * @return {?string}
			 * @static
			 */
			DOM.inheritAttr = function (element, attr, selector) {
				var value = element.getAttribute(attr),
					parent;
				if (!value) {
					parent = selectors.getClosestBySelector(element, selector);
					if (parent) {
						return parent.getAttribute(attr);
					}
				}
				return value;
			};

			/**
			 * Returns Number from properties described in html tag
			 * @method getNumberFromAttribute
			 * @memberOf ns.utils.DOM
			 * @param {HTMLElement} element
			 * @param {string} attribute
			 * @param {string=} [type] auto type casting
			 * @param {number} [defaultValue] default returned value
			 * @static
			 * @return {number}
			 */
			DOM.getNumberFromAttribute = function (element, attribute, type, defaultValue) {
				var value = element.getAttribute(attribute),
					result = defaultValue;

				if (value) {
					if (type === "float") {
						value = parseFloat(value);
						if (value) {
							result = value;
						}
					} else {
						value = parseInt(value, 10);
						if (value) {
							result = value;
						}
					}
				}
				return result;
			};

			function getDataName(name) {
				var namespace = ns.get(namespace);
				return "data-" + (namespace ? namespace + "-" : "") + name;
			}

			/**
			 * This function sets value of attribute data-{namespace}-{name} for element.
			 * If the namespace is empty, the attribute data-{name} is used.
			 * @method setNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @param {string|number|boolean} value New value
			 * @memberOf ns.utils.DOM
			 * @static
			 */
			DOM.setNSData = function (element, name, value) {
				element.setAttribute(getDataName(name), value);
			};

			/**
			 * This function returns value of attribute data-{namespace}-{name} for element.
			 * If the namespace is empty, the attribute data-{name} is used.
			 * Method may return boolean in case of 'true' or 'false' strings as attribute value.
			 * @method getNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @memberOf ns.utils.DOM
			 * @return {?string|boolean}
			 * @static
			 */
			DOM.getNSData = function (element, name) {
				var value = element.getAttribute(getDataName(name));

				if (value === "true") {
					return true;
				}

				if (value === "false") {
					return false;
				}

				return value;
			};

			/**
			 * This function returns true if attribute data-{namespace}-{name} for element is set
			 * or false in another case. If the namespace is empty, attribute data-{name} is used.
			 * @method hasNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @memberOf ns.utils.DOM
			 * @return {boolean}
			 * @static
			 */
			DOM.hasNSData = function (element, name) {
				return element.hasAttribute(getDataName(name));
			};

			/**
			 * Get or set value on data attribute.
			 * @method nsData
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @param {?Mixed} [value]
			 * @static
			 * @memberOf ns.utils.DOM
			 */
			DOM.nsData = function (element, name, value) {
				// @TODO add support for object in value
				if (value === undefined) {
					return DOM.getNSData(element, name);
				} else {
					return DOM.setNSdata(element, name, value);
				}
			};

			/**
			 * This function removes attribute data-{namespace}-{name} from element.
			 * If the namespace is empty, attribute data-{name} is used.
			 * @method removeNSData
			 * @param {HTMLElement} element Base element
			 * @param {string} name Name of attribute
			 * @memberOf ns.utils.DOM
			 * @static
			 */
			DOM.removeNSData = function (element, name) {
				element.removeAttribute(getDataName(name));
			};

			/**
			 * Returns object with all data-* attributes of element
			 * @method getData
			 * @param {HTMLElement} element Base element
			 * @memberOf ns.utils.DOM
			 * @return {Object}
			 * @static
			 */
			DOM.getData = function (element) {
				var dataPrefix = "data-",
					data = {},
					attrs = element.attributes,
					attr,
					nodeName,
					i,
					length = attrs.length;

				for (i = 0; i < length; i++) {
					attr = attrs.item(i);
					nodeName = attr.nodeName;
					if (nodeName.indexOf(dataPrefix) > -1) {
						data[nodeName.replace(dataPrefix, "")] = attr.nodeValue;
					}
				}

				return data;
			};

			/**
			 * Special function to remove attribute and property in the same time
			 * @method removeAttribute
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @memberOf ns.utils.DOM
			 * @static
			 */
			DOM.removeAttribute = function (element, name) {
				element.removeAttribute(name);
				element[name] = false;
			};

			/**
			 * Special function to set attribute and property in the same time
			 * @method setAttribute
			 * @param {HTMLElement} element
			 * @param {string} name
			 * @param {Mixed} value
			 * @memberOf ns.utils.DOM
			 * @static
			 */
			DOM.setAttribute = function (element, name, value) {
				element[name] = value;
				element.setAttribute(name, value);
			};
			}(window, window.document, ns));

/*global window, define */
/*jslint nomen: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 */
/**
 * #BaseWidget
 * Prototype class of widget
 * ## How to invoke creation of widget from JavaScript
 *
 * To build and initialize widget in JavaScript you have to use method {@link ns.engine#instanceWidget} . First argument for method
 * is HTMLElement, which specifies the element of widget. Second parameter is name of widget to create.
 *
 * If you load jQuery before initializing ej library, you can use standard jQuery UI Widget notation.
 *
 * ### Examples
 * #### Build widget from JavaScript
 *
 *     @example
 *     var element = document.getElementById('id'),
 *         ns.engine.instanceWidget(element, 'Button');
 *
 * #### Build widget from jQuery
 *
 *     @example
 *     var element = $('#id').button();
 *
 * ## How to create new widget
 *
 *     @example
 *     (function (ns) {
 *         
 *          *                 var BaseWidget = ns.widget.BaseWidget, // create alias to main objects
 *                     ...
 *                     arrayOfElements, // example of private property, common for all instances of widget
 *                     Button = function () { // create local object with widget
 *                         ...
 *                     },
 *                     prototype = new BaseWidget(); // add ns.widget.BaseWidget as prototype to widget's object, for better minification this should be assign to local variable and next variable should be assign to prototype of object
 *
 *                 function closestEnabledButton(element) { // example of private method
 *                     ...
 *                 }
 *                 ...
 *
 *                 prototype.options = { //add default options to be read from data- attributes
 *                     theme: 's',
 *                     ...
 *                 };
 *
 *                 prototype._build = function (template, element) { // method called when the widget is being built, should contain all HTML manipulation actions
 *                     ...
 *                     return element;
 *                 };
 *
 *                 prototype._init = function (element) { // method called during initialization of widget, should contain all actions necessary on application start
 *                     ...
 *                     return element;
 *                 };
 *
 *                 prototype._bindEvents = function (element) { // method to bind all events, should contain all event bindings
 *                     ...
 *                 };
 *
 *                 prototype._buildBindEvents = function (element) { // method to bind all events, should contain all event bindings necessary during build
 *                     ...
 *                 };
 *
 *                 prototype._enable = function (element) { // method called during invocation of enable() method
 *                     ...
 *                 };
 *
 *                 prototype._disable = function (element) { // method called during invocation of disable() method
 *                     ...
 *                 };
 *
 *                 prototype.refresh = function (element) { // example of public method
 *                     ...
 *                 };
 *
 *                 prototype._refresh = function () { // example of protected method
 *                     ...
 *                 };
 *
 *                 Button.prototype = prototype;
 *
 *                 engine.defineWidget( // define widget
 *                     "Button", //name of widget
 *                     "./widget/ns.widget.Button", // name of widget's module (name of file), deprecated
 *                     "[data-role='button'],button,[type='button'],[type='submit'],[type='reset']",  //widget's selector
 *                     [ // public methods, here should be list all public method, without that method will not be available
 *                         "enable",
 *                         "disable",
 *                         "refresh"
 *                     ],
 *                     Button, // widget's object
 *                     "mobile" // widget's namespace
 *                 );
 *                 ns.widget.Button = Button;
 *                  *     }(ns));
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @author Przemyslaw Ciezkowski <p.ciezkowski@samsung.com>
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Michał Szepielak <m.szepielak@samsung.com>
 * @class ns.widget.BaseWidget
 * @alias BaseWidget
 */
(function (document, ns) {
	
				/**
			* Alias to Array.slice function
			* @method slice
			* @memberOf ns.widget.BaseWidget
			* @private
			* @static
			*/
			var slice = [].slice,
				/**
				* @property {ns.engine} engine Alias to ns.engine
				* @memberOf ns.widget.BaseWidget
				* @private
				* @static
				*/
				engine = ns.engine,
				engineDataEj = engine.dataEj,
				utils = ns.utils,
				/**
				* @property {Object} eventUtils Alias to {@link ns.utils.events}
				* @memberOf ns.widget.BaseWidget
				* @private
				* @static
				*/
				eventUtils = utils.events,
				/**
				* @property {Object} domUtils Alias to {@link ns.utils.DOM}
				* @private
				* @static
				*/
				domUtils = utils.DOM,
				/**
				 * @property {Object} objectUtils Alias to {@link ns.utils.object}
				 * @private
				 * @static
				 */
				objectUtils = utils.object,
				BaseWidget = function () {
					return this;
				},
				prototype = {},
				/**
				 * @property {string} [TYPE_FUNCTION="function"] property with string represent function type (for better minification)
				 * @private
				 * @static
				 * @readonly
				 */
				TYPE_FUNCTION = "function";

			/**
			 * Configure widget object from definition
			 * @method configure
			 * @param {Object} definition
			 * @param {string} definition.name Name of the widget
			 * @param {string} definition.selector Selector of the widget
			 * @param {HTMLElement} element
			 * @param {Object} options Configure options
			 * @memberOf ns.widget.BaseWidget
			 * @chainable
			 * @instance
			 */
			/**
			 * Protected method configuring the widget
			 * @method _configure
			 * @memberOf ns.widget.BaseWidget
			 * @template
			 * @instance
			 */
			prototype.configure = function (definition, element, options) {
				var self = this,
					definitionName,
					definitionNamespace;
				/**
				 * @property {Object} [options={}] Object with options for widget
				 * @memberOf ns.widget.BaseWidget
				 * @instance
				 */
				self.options = self.options || {};
				/**
				 * @property {?HTMLElement} [element=null] Base element of widget
				 * @memberOf ns.widget.BaseWidget
				 * @instance
				 */
				self.element = self.element || null;
				if (definition) {
					definitionName = definition.name;
					definitionNamespace = definition.namespace;
					/**
					* @property {string} name Name of the widget
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.name = definitionName;

					/**
					* @property {string} widgetName Name of the widget (in lower case)
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.widgetName = definitionName;

					/**
					* @property {string} widgetEventPrefix Namespace of widget events
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.widgetEventPrefix = definitionName.toLowerCase();

					/**
					* @property {string} namespace Namespace of the widget
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.namespace = definitionNamespace;

					/**
					* @property {string} widgetFullName Full name of the widget
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.widgetFullName = ((definitionNamespace ? definitionNamespace + '-' : "") + definitionName).toLowerCase();
					/**
					* @property {string} id Id of widget instance
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.id = ns.getUniqueId();

					/**
					* @property {string} selector widget's selector
					* @memberOf ns.widget.BaseWidget
					* @instance
					*/
					self.selector = definition.selector;
				}

				if (typeof self._configure === TYPE_FUNCTION) {
					self._configure();
				}

				self._getCreateOptions(element);

				objectUtils.merge(self.options, options);
			};

			/**
			* Read data-* attributes and save to #options object
			* @method _getCreateOptions
			* @param {HTMLElement} element Base element of the widget
			* @return {Object}
			* @memberOf ns.widget.BaseWidget
			* @protected
			* @instance
			*/
			prototype._getCreateOptions = function (element) {
				var options = this.options,
					bigRegexp = new RegExp(/[A-Z]/g);
				if (options !== undefined) {
					Object.keys(options).forEach(function (option) {
						// Get value from data-{namespace}-{name} element's attribute
						// based on widget.options property keys
						var value = domUtils.getNSData(element, (option.replace(bigRegexp, function (c) {
							return "-" + c.toLowerCase();
						})));

						if (value !== null) {
							options[option] = value;
						}
					});
				}
				return options;
			};
			/**
			* Protected method building the widget
			* @method _build
			* @param template
			* @param {HTMLElement} element
			* @return {HTMLElement} widget's element
			* @memberOf ns.widget.BaseWidget
			* @protected
			* @template
			* @instance
			*/
			/**
			* Build widget. Call #\_getCreateOptions, #\_build
			* @method build
			* @param template
			* @param {HTMLElement} element
			* @return {HTMLElement} widget's element
			* @memberOf ns.widget.BaseWidget
			* @instance
			*/
			prototype.build = function (template, element) {
				var self = this,
					id,
					node;
				eventUtils.trigger(element, this.widgetEventPrefix + "beforecreate");
				element.setAttribute(engineDataEj.built, true);
				element.setAttribute(engineDataEj.binding, self.binding);
				element.setAttribute(engineDataEj.name, self.name);
				element.setAttribute(engineDataEj.selector, self.selector);
				id = element.id;
				if (id) {
					self.id = id;
				} else {
					element.id = self.id;
				}

				if (typeof self._build === TYPE_FUNCTION) {
					node = self._build(template, element);
				} else {
					node = element;
				}
				return node;
			};

			/**
			* Protected method initializing the widget
			* @method _init
			* @param {HTMLElement} element
			* @memberOf ns.widget.BaseWidget
			* @template
			* @protected
			* @instance
			*/
			/**
			* Init widget, call: #\_getCreateOptions, #\_init
			* @method init
			* @param {HTMLElement} element
			* @memberOf ns.widget.BaseWidget
			* @chainable
			* @instance
			*/
			prototype.init = function (element) {
				var self = this;
				self.id = element.id;

				if (typeof self._init === TYPE_FUNCTION) {
					self._init(element);
				}

				if (element.getAttribute("disabled")) {
					self.disable();
				} else {
					self.enable();
				}

				return self;
			};

			/**
			* Bind widget events attached in build mode
			* @method _buildBindEvents
			* @param {HTMLElement} element Base element of widget
			* @memberOf ns.widget.BaseWidget
			* @template
			* @protected
			* @instance
			*/
			/**
			* Bind widget events attached in init mode
			* @method _bindEvents
			* @param {HTMLElement} element Base element of widget
			* @memberOf ns.widget.BaseWidget
			* @template
			* @protected
			* @instance
			*/
			/**
			* Bind widget events, call: #\_buildBindEvents, #\_bindEvents
			* @method bindEvents
			* @param {HTMLElement} element Base element of the widget
			* @param {boolean} onlyBuild Inform about the type of bindings: build/init
			* @memberOf ns.widget.BaseWidget
			* @chainable
			* @instance
			*/
			prototype.bindEvents = function (element, onlyBuild) {
				var self = this;
				if (!onlyBuild) {
					element.setAttribute(engineDataEj.bound, "true");
				}
				if (typeof self._buildBindEvents === TYPE_FUNCTION) {
					self._buildBindEvents(element);
				}
				if (!onlyBuild && typeof self._bindEvents === TYPE_FUNCTION) {
					self._bindEvents(element);
				}

				self.trigger(self.widgetEventPrefix + "create", self);

				return self;
			};

			/**
			* Protected method destroying the widget
			* @method _destroy
			* @template
			* @protected
			* @memberOf ns.widget.BaseWidget
			* @instance
			*/
			/**
			* Destroy widget, call #\_destroy
			* @method destroy
			* @memberOf ns.widget.BaseWidget
			* @instance
			*/
			prototype.destroy = function (element) {
				var self = this;
				if (typeof self._destroy === TYPE_FUNCTION) {
					self._destroy(element);
				}
				if (self.element) {
					self.trigger(self.widgetEventPrefix + "destroy");
				}
				element = element || self.element;
				if (element) {
					engine.removeBinding(element);
				}
			};

			/**
			* Protected method disabling the widget
			* @method _disable
			* @protected
			* @memberOf ns.widget.BaseWidget
			* @template
			* @instance
			*/
			/**
			* Disable widget, call: #\_disable
			* @method disable
			* @memberOf ns.widget.BaseWidget
			* @chainable
			* @instance
			*/
			prototype.disable = function () {
				var self = this,
					element = self.element,
					args = slice.call(arguments);

				if (typeof self._disable === TYPE_FUNCTION) {
					args.unshift(element);
					self._disable.apply(self, args);
				}
				return this;
			};

			/**
			* Protected method enabling the widget
			* @method _enable
			* @protected
			* @memberOf ns.widget.BaseWidget
			* @template
			* @instance
			*/
			/**
			* Enable widget, call: #\_enable
			* @method enable
			* @memberOf ns.widget.BaseWidget
			* @chainable
			* @instance
			*/
			prototype.enable = function () {
				var self = this,
					element = self.element,
					args = slice.call(arguments);

				if (typeof self._enable === TYPE_FUNCTION) {
					args.unshift(element);
					self._enable.apply(self, args);
				}
				return this;
			};

			/**
			* Protected method causing the widget to refresh
			* @method _refresh
			* @protected
			* @memberOf ns.widget.BaseWidget
			* @template
			* @instance
			*/
			/**
			* Refresh widget, call: #\_refresh
			* @method refresh
			* @memberOf ns.widget.BaseWidget
			* @chainable
			* @instance
			*/
			prototype.refresh = function () {
				var self = this;
				if (typeof self._refresh === TYPE_FUNCTION) {
					self._refresh();
				}
				return self;
			};


			/**
			 * Get/Set options of the widget
			 * @method option
			 * @memberOf ns.widget.BaseWidget
			 * @return {*}
			 * @instance
			 */
			prototype.option = function () {
				var self = this,
					args = slice.call(arguments),
					firstArgument = args.shift(),
					secondArgument = args.shift(),
					methodName;
				/*
				* @TODO fill content of function
				*/
				if (typeof firstArgument === "string") {
					if (secondArgument === undefined) {
						methodName = '_get' + (firstArgument[0].toUpperCase() + firstArgument.slice(1));
						if (typeof self[methodName] === TYPE_FUNCTION) {
							return self[methodName]();
						}
						return self.options[firstArgument];
					}
					methodName = '_set' + (firstArgument[0].toUpperCase() + firstArgument.slice(1));
					if (typeof self[methodName] === TYPE_FUNCTION) {
						self[methodName](self.element, secondArgument);
					} else {
						this.options[firstArgument] = secondArgument;
						if (self.element) {
							self.element.setAttribute('data-' + (firstArgument.replace(/[A-Z]/g, function (c) {
								return "-" + c.toLowerCase();
							})), secondArgument);
							self.refresh();
						}
					}
				}
			};

			/**
			* Checks if the widget has bounded events through the {@link ns.widget.BaseWidget#bindEvents} method.
			* @method isBound
			* @memberOf ns.widget.BaseWidget
			* @instance
			* @return {boolean} true if events are bounded
			*/
			prototype.isBound = function () {
				var element = this.element;
				return element && element.hasAttribute(engineDataEj.bound);
			};

			/**
			* Checks if the widget was built through the {@link ns.widget.BaseWidget#build} method.
			* @method isBuilt
			* @memberOf ns.widget.BaseWidget
			* @instance
			* @return {boolean} true if the widget was built
			*/
			prototype.isBuilt = function () {
				var element = this.element;
				return element && element.hasAttribute(engineDataEj.built);
			};

			/**
			* Protected method getting the value of widget
			* @method _getValue
			* @return {*}
			* @memberOf ns.widget.BaseWidget
			* @template
			* @protected
			* @instance
			*/
			/**
			* Protected method setting the value of widget
			* @method _setValue
			* @param {*} value
			* @return {*}
			* @memberOf ns.widget.BaseWidget
			* @template
			* @protected
			* @instance
			*/
			/**
			* Get/Set value of the widget
			* @method value
			* @param {*} [value]
			* @memberOf ns.widget.BaseWidget
			* @return {*}
			* @instance
			*/
			prototype.value = function (value) {
				var self = this;
				if (value !== undefined) {
					if (typeof self._setValue === TYPE_FUNCTION) {
						return self._setValue(value);
					}
					return self;
				}
				if (typeof self._getValue === TYPE_FUNCTION) {
					return self._getValue();
				}
				return self;
			};

			/**
			 * Trigger an event on widget's element.
			 * @method trigger
			 * @param {string} eventName the name of event to trigger
			 * @param {?*} [data] additional object to be carried with the event
			 * @param {Boolean=} [bubbles=true]
			 * @param {Boolean=} [cancelable=true]
			 * @memberOf ns.widget.BaseWidget
			 * @return {boolean} false, if any callback invoked preventDefault on event object
			 * @instance
			*/
			prototype.trigger = function (eventName, data, bubbles, cancelable) {
				return eventUtils.trigger(this.element, eventName, data, bubbles, cancelable);
			};

			/**
			 * Add event listener to this.element.
			 * @method on
			 * @param {string} eventName the name of event
			 * @param {Function} listener function call after event will be trigger
			 * @param {boolean} [useCapture=false] useCapture param tu addEventListener
			 * @memberOf ns.widget.BaseWidget
			 * @instance
			 */
			prototype.on = function (eventName, listener, useCapture) {
				eventUtils.on(this.element, eventName, listener, useCapture);
			};

			/**
			 * Remove event listener to this.element.
			 * @method off
			 * @param {string} eventName the name of event
			 * @param {Function} listener function call after event will be trigger
			 * @param {boolean} [useCapture=false] useCapture param tu addEventListener
			 * @memberOf ns.widget.BaseWidget
			 * @instance
			 */
			prototype.off = function (eventName, listener, useCapture) {
				eventUtils.off(this.element, eventName, listener, useCapture);
			};

			BaseWidget.prototype = prototype;

			// definition
			ns.widget.BaseWidget = BaseWidget;

			}(window.document, window.ej));

/*global window, define */
/*jslint plusplus: true, nomen: true */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
/**
 * @class tau.VirtualGrid
 * @inheritdoc ns.widget.micro.VirtualGrid
 * @extends ns.widget.micro.VirtualGrid
 */
/**
 * @class tau.VirtualListview
 * @inheritdoc ns.widget.micro.VirtualListview
 * @extends ns.widget.micro.VirtualListview
 */
/**
 * @class tau.Popup
 * @inheritdoc ns.widget.micro.Popup
 * @extends ns.widget.micro.Popup
 */
/**
 * @class tau.Page
 * @inheritdoc ns.widget.micro.Page
 * @extends ns.widget.micro.Page
 */
/**
 * @class tau.PageContainer
 * @inheritdoc ns.widget.micro.PageContainer
 * @extends ns.widget.micro.PageContainer
 */
/**
 * @class tau.IndexScrollbar
 * @inheritdoc ns.widget.micro.IndexScrollbar
 * @extends ns.widget.micro.IndexScrollbar
 */
(function (document, frameworkNamespace, ns) {
	
	
			document.addEventListener("widgetdefined", function (evt) {
				var definition = evt.detail,
					name = definition.name,
					engine = frameworkNamespace.engine;

				ns[name] = (function (definitionName) {
					return function (element, options) {
						return engine.instanceWidget(element, definitionName, options);
					};
				}(name));
			}, false);

			}(window.document, window.ej, window.tau));

/*global window, define, ns */
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 */
(function (window, ns) {
	
				/** @namespace ns.widget.micro */
			ns.widget.micro = ns.widget.micro || {};
			}(window, ns));

/*global window, define */
/*jslint nomen: true, white: true, plusplus: true*/
/*
* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 *#Virtual List
 *
 * In the Web environment, it is challenging to display a large amount of data in a list, such as
 * displaying a contact list of over 1000 list items. It takes time to display the entire list in
 * HTML and the DOM manipulation is complex.
 *
 * The virtual list widget is used to display a list of unlimited data elements on the screen
 * for better performance. This widget provides easy access to databases to retrieve and display data.
 * It based on **result set** which is fixed size defined by developer by data-row attribute. Result
 * set should be **at least 3 times bigger** then size of clip (number of visible elements).
 *
 * To add a virtual list widget to the application follow these steps:
 *
 * ##Create widget container - list element
 *

   &lt;ul id=&quot;vlist&quot; class=&quot;ui-listview ui-virtuallistview&quot;&gt;&lt;/ul&gt;

 *
 * ##Initialize widget
 *
	// Get HTML Element reference
	var elList = document.getElementById("vlist"),
		// Set up config. All config options can be found in virtual list reference
		vListConfig = {
		dataLength: 2000,
		bufferSize: 40,
		listItemUpdater: function(elListItem, newIndex){
			// NOTE: JSON_DATA is global object with all data rows.
			var data = JSON_DATA["newIndex"];
			elListItem.innerHTML = '<span class="ui-li-text-main">' +
												data.NAME + '</span>';
			}
		};
	vlist = tau.VirtualListview(elList, vListConfig);
 *
 * More config options can be found in {@link ns.widget.micro.VirtualListview#options}
 *
 * ##Set list item update function
 *
 * List item update function is responsible to update list element depending on data row index. If you didn’t
 * pass list item update function by config option, you have to do it using following method.
 * Otherwise you will see an empty list.
 *
 *
	vlist.setListItemUpdater(function(elListItem, newIndex){
		// NOTE: JSON_DATA is global object with all data rows.
		var data = JSON_DATA["newIndex"];
		elListItem.innerHTML = '<span class="ui-li-text-main">' +
									data.NAME + '</span>';
	});
 *
 * **Attention:** Virtual List manipulates DOM elements to be more efficient. It doesn’t remove or create list
 * elements before calling list item update function. It means that, you have to take care about list element
 * and keep it clean from custom classes an attributes, because order of li elements is volatile.
 *
 * ##Draw child elements
 * If all configuration options are set, call draw method to draw child elements and make virtual list work.
 *
	vlist.draw();
 *
 * ##Destroy Virtual List
 * It’s highly recommended to destroy widgets, when they aren’t necessary. To destroy Virtual List call destroy method.
 *
	vlist.destroy();
 *
 * ##Full working code
 *
	var page = document.getElementById("pageTestVirtualList"),
		vlist,
		// Assing data.
		JSON_DATA = [
			{NAME:"Abdelnaby, Alaa", ACTIVE:"1990 - 1994", FROM:"College - Duke", TEAM_LOGO:"../test/1_raw.jpg"},
			{NAME:"Abdul-Aziz, Zaid", ACTIVE:"1968 - 1977", FROM:"College - Iowa State", TEAM_LOGO:"../test/2_raw.jpg"}
			// A lot of records.
			// These database can be found in Gear Sample Application Winset included to Tizen SDK
			];

		page.addEventListener("pageshow", function() {
			var elList = document.getElementById("vlist");

			vlist = tau.VirtualListview(elList, {
					dataLength: JSON_DATA.length,
					bufferSize: 40
			});

			// Set list item updater
			vlist.setListItemUpdater(function(elListItem, newIndex) {
				//TODO: Update listitem here
				var data =  JSON_DATA[newIndex];
				elListItem.innerHTML = '<span class="ui-li-text-main">' +
											data.NAME + '</span>';
			});
			// Draw child elements
			vlist.draw();
		});
		page.addEventListener("pagehide", function() {
			// Remove all children in the vlist
			vlist.destroy();
		});
 *
 * @class ns.widget.micro.VirtualListview
 * @extend ns.widget.BaseWidget
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 * @author Michał Szepielak <m.szepielak@samsung.com>
 */
(function(document, ns) {
	
					var BaseWidget = ns.widget.BaseWidget,
						/**
						 * @property {Object} engine Alias for class {@link ns.engine}
						 * @private
						 * @static
						 * @memberOf ns.widget.micro.VirtualListview
						 */
						engine = ns.engine,
						events = ns.utils.events,
						// Constants definition
						/**
						 * @property {number} SCROLL_UP Defines index of scroll `{@link ns.widget.micro.VirtualListview#_scroll}.direction`
						 * to retrive if user is scrolling up
						 * @private
						 * @static
						 * @memberOf ns.widget.micro.VirtualListview
						 */
						SCROLL_UP = 0,
						/**
						 * @property {number} SCROLL_RIGHT Defines index of scroll `{@link ns.widget.micro.VirtualListview#_scroll}.direction`
						 * to retrive if user is scrolling right
						 * @private
						 * @static
						 * @memberOf ns.widget.micro.VirtualListview
						 */
						SCROLL_RIGHT = 1,
						/**
						 * @property {number} SCROLL_DOWN Defines index of scroll {@link ns.widget.micro.VirtualListview#_scroll}
						 * to retrive if user is scrolling down
						 * @private
						 * @static
						 * @memberOf ns.widget.micro.VirtualListview
						 */
						SCROLL_DOWN = 2,
						/**
						 * @property {number} SCROLL_LEFT Defines index of scroll {@link ns.widget.micro.VirtualListview#_scroll}
						 * to retrive if user is scrolling left
						 * @private
						 * @static
						 * @memberOf ns.widget.micro.VirtualListview
						 */
						SCROLL_LEFT = 3,
						/**
						 * @property {string} VERTICAL Defines vertical scrolling orientation. It's default orientation.
						 * @private
						 * @static
						 */
						VERTICAL = 'y',
						/**
						 * @property {string} HORIZONTAL Defines horizontal scrolling orientation.
						 * @private
						 * @static
						 */
						HORIZONTAL = 'x',
						/**
						 * @property {boolean} blockEvent Determines that scroll event should not be taken into account if scroll event accurs.
						 * @private
						 * @static
						 */
						blockEvent = false,
						/**
						 * @property {number} timeoutHandler Handle window timeout ID.
						 * @private
						 * @static
						 */
						timeoutHandler,
						/**
						 * @property {Object} origTarget Reference to original target object from touch event.
						 * @private
						 * @static
						 */
						origTarget,
						/**
						 * @property {number} tapholdThreshold Number of miliseconds to determine if tap event occured.
						 * @private
						 * @static
						 */
						tapholdThreshold = 250,
						/**
						 * @property {Object} tapHandlerBound Handler for touch event listener to examine tap occurance.
						 * @private
						 * @static
						 */
						tapHandlerBound = null,
						/**
						 * @property {Object} lastTouchPos Stores last touch position to examine tap occurance.
						 * @private
						 * @static
						 */
						lastTouchPos =	{},

						/**
						 * Local constructor function
						 * @method VirtualListview
						 * @private
						 * @memberOf ns.widget.micro.VirtualListview
						 */
						VirtualListview = function() {
							var self = this;
							/**
							 * @property {Object} ui VirtualListview widget's properties associated with
							 * User Interface
							 * @property {?HTMLElement} [ui.scrollview=null] Scroll element
							 * @property {number} [ui.itemSize=0] Size of list element in piksels. If scrolling is
							 * vertically it's item width in other case it"s height of item element
							 * @memberOf ns.widget.micro.VirtualListview
							 */
							self.ui = {
								scrollview: null,
								spacer: null,
								itemSize: 0
							};

							/**
							 * @property {Object} _scroll Holds information about scrolling state
							 * @property {Array} [_scroll.direction=[0,0,0,0]] Holds current direction of scrolling.
							 * Indexes suit to following order: [up, left, down, right]
							 * @property {number} [_scroll.lastPositionX=0] Last scroll position from top in pixels.
							 * @property {number} [_scroll.lastPositionY=0] Last scroll position from left in pixels.
							 * @property {number} [_scroll.lastJumpX=0] Difference between last and current
							 * position of horizontal scroll.
							 * @property {number} [_scroll.lastJumpY=0] Difference between last and current
							 * position of vertical scroll.
							 * @property {number} [_scroll.clipWidth=0] Width of clip - visible area for user.
							 * @property {number} [_scroll.clipHeight=0] Height of clip - visible area for user.
							 * @memberOf ns.widget.micro.VirtualListview
							 */
							self._scroll = {
								direction: [0, 0, 0, 0],
								lastPositionX: 0,
								lastPositionY: 0,
								lastJumpX: 0,
								lastJumpY: 0,
								clipWidth: 0,
								clipHeight: 0
							};

							self.name = "VirtualListview";

							/**
							 * @property {number} _currentIndex Current zero-based index of data set.
							 * @memberOf ns.widget.micro.VirtualListview
							 * @protected
							 * @instance
							 */
							self._currentIndex = 0;

							/**
							 * @property {Object} options VirtualListview widget options.
							 * @property {number} [options.bufferSize=100] Number of items of result set. The default value is 100.
							 * As the value gets higher, the loading time increases while the system performance
							 * improves. So you need to pick a value that provides the best performance
							 * without excessive loading time. It's recomended to set bufferSize at least 3 times bigger than number
							 * of visible elements.
							 * @property {number} [options.dataLength=0] Total number of items.
							 * @property {string} [options.orientation='y'] Scrolling orientation. Default vertical scrolling enabled.
							 * @property {Object} options.listItemUpdater Holds reference to method which modifies list item, depended
							 * at specified index from database. **Method should be overridden by developer using
							 * {@link ns.widget.micro.VirtualListview#setListItemUpdater} method.** or defined as a config
							 * object. Method takes two parameters:
							 *  -  element {HTMLElement} List item to be modified
							 *  -  index {number} Index of data set
							 * @memberOf ns.widget.micro.VirtualListview
							 */
							self.options = {
								bufferSize: 100,
								dataLength: 0,
								orientation: VERTICAL,
								listItemUpdater: null
							};

							/**
							* @method _scrollEventBound Binding for scroll event listener.
							* @memberOf ns.widget.micro.VirtualListview
							* @protected
							* @instance
							*/
							self._scrollEventBound = null;
							/**
							* @method _touchStartEventBound Binding for touch start event listener.
							* @memberOf ns.widget.micro.VirtualListview
							* @protected
							* @instance
							*/
							self._touchStartEventBound = null;

							return self;
						},
						// Cached prototype for better minification
						prototype = new BaseWidget();

				/**
				 * @property {Object} classes Dictionary object containing commonly used wiget classes
				 * @static
				 * @memberOf ns.widget.micro.VirtualListview
				 */
				VirtualListview.classes = {
					uiVirtualListContainer: "ui-virtual-list-container",
					uiListviewActive: "ui-listview-active"
				};

				/**
				 * Remove highlight from items.
				 * @method _removeHighlight
				 * @param {Object} self Reference to VirtualListview object.
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _removeHighlight (self) {
					var children = self.element.children,
						i = children.length;
					while (--i >= 0) {
						children[i].classList.remove(VirtualListview.classes.uiListviewActive);
					}
				}

				/**
				 * Checks if tap meet the condition.
				 * @method _tapHandler
				 * @param {Object} self Reference to VirtualListview object.
				 * @param {Event} event Received Touch event
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _tapHandler (self, event) {
					var eventTouch = event.changedTouches[0];

					if (event.type === 'touchmove') {
						if (Math.abs(lastTouchPos.clientX - eventTouch.clientX) > 10 && Math.abs(lastTouchPos.clientY - eventTouch.clientY) > 10) {
							_removeHighlight(self);
							window.clearTimeout(timeoutHandler);
						}
					} else {
						_removeHighlight(self);
						window.clearTimeout(timeoutHandler);
					}

				}

				/**
				 * Adds highlight
				 * @method tapholdListener
				 * @param {Object} self Reference to VirtualListview object.
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function tapholdListener(self) {
					var liElement;

					liElement = origTarget.tagName === 'LI' ? origTarget : origTarget.parentNode;

					origTarget.removeEventListener('touchmove', tapHandlerBound, false);
					origTarget.removeEventListener('touchend', tapHandlerBound, false);
					tapHandlerBound = null;

					_removeHighlight(self);
					liElement.classList.add(VirtualListview.classes.uiListviewActive);
					lastTouchPos = {};
				}

				/**
				 * Binds touching events to examine tap event.
				 * @method _touchStartHandler
				 * @param {Object} self Reference to VirtualListview object.
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _touchStartHandler (self, event) {
					origTarget = event.target;

					// Clean up
					window.clearTimeout(timeoutHandler);
					origTarget.removeEventListener('touchmove', tapHandlerBound, false);
					origTarget.removeEventListener('touchend', tapHandlerBound, false);

					timeoutHandler = window.setTimeout(tapholdListener.bind(null, self), tapholdThreshold);
					lastTouchPos.clientX = event.touches[0].clientX;
					lastTouchPos.clientY = event.touches[0].clientY;

					//Add touch listeners
					tapHandlerBound = _tapHandler.bind(null, self);
					origTarget.addEventListener('touchmove', tapHandlerBound, false);
					origTarget.addEventListener('touchend', tapHandlerBound, false);

				}


				/**
				 * Updates scroll information about position, direction and jump size.
				 * @method _updateScrollInfo
				 * @param {ns.widget.micro.VirtualListview} self VirtualListview widget reference
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _updateScrollInfo(self) {
					var scrollInfo = self._scroll,
						scrollDirection = scrollInfo.direction,
						scrollViewElement = self.ui.scrollview,
						scrollLastPositionX = scrollInfo.lastPositionX,
						scrollLastPositionY = scrollInfo.lastPositionY,
						scrollviewPosX = scrollViewElement.scrollLeft,
						scrollviewPosY = scrollViewElement.scrollTop;

					self._refreshScrollbar();
					//Reset scroll matrix
					scrollDirection = [0, 0, 0, 0];

					//Scrolling UP
					if (scrollviewPosY < scrollLastPositionY) {
						scrollDirection[SCROLL_UP] = 1;
					}

					//Scrolling RIGHT
					if (scrollviewPosX < scrollLastPositionX) {
						scrollDirection[SCROLL_RIGHT] = 1;
					}

					//Scrolling DOWN
					if (scrollviewPosY > scrollLastPositionY) {
						scrollDirection[SCROLL_DOWN] = 1;
					}

					//Scrolling LEFT
					if (scrollviewPosX > scrollLastPositionX) {
						scrollDirection[SCROLL_LEFT] = 1;
					}

					scrollInfo.lastJumpY = Math.abs(scrollviewPosY - scrollLastPositionY);
					scrollInfo.lastJumpX = Math.abs(scrollviewPosX - scrollLastPositionX);
					scrollInfo.lastPositionX = scrollviewPosX;
					scrollInfo.lastPositionY = scrollviewPosY;
					scrollInfo.direction = scrollDirection;
					scrollInfo.clipHeight = scrollViewElement.clientHeight;
					scrollInfo.clipWidth = scrollViewElement.clientWidth;
				}

				/**
				 * Computes list element size according to scrolling orientation
				 * @method _computeElementSize
				 * @param {HTMLElement} element Element whose size should be computed
				 * @param {string} orientation Scrolling orientation
				 * @return {number} Size of element in pixels
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _computeElementSize(element, orientation) {
					// @TODO change to utils method if it will work perfectly
					return parseInt(orientation === VERTICAL ? element.clientHeight : element.clientWidth, 10) + 1;
				}

				/**
				 * Scrolls and manipulates DOM element to destination index. Element at destination
				 * index is the first visible element on the screen. Destination index can
				 * be different from Virtual List's current index, because current index points
				 * to first element in the buffer.
				 * @memberOf ns.widget.micro.VirtualListview
				 * @param {ns.widget.micro.VirtualListview} self VirtualListview widget reference
				 * @param {number} toIndex Destination index.
				 * @method _orderElementsByIndex
				 * @private
				 * @static
				 */
				function _orderElementsByIndex(self, toIndex) {
					var element = self.element,
						options = self.options,
						scrollInfo = self._scroll,
						scrollClipSize = 0,
						dataLength = options.dataLength,
						indexCorrection = 0,
						bufferedElements = 0,
						avgListItemSize = 0,
						bufferSize = options.bufferSize,
						i,
						offset = 0,
						index;

					//Get size of scroll clip depended on scroll direction
					scrollClipSize = options.orientation === VERTICAL ? scrollInfo.clipHeight : scrollInfo.clipWidth;

					//Compute average list item size
					avgListItemSize = _computeElementSize(element, options.orientation) / bufferSize;

					//Compute average number of elements in each buffer (before and after clip)
					bufferedElements = Math.floor((bufferSize - Math.floor(scrollClipSize / avgListItemSize)) / 2);

					if (toIndex - bufferedElements <= 0) {
						index = 0;
						indexCorrection = 0;
					} else {
						index = toIndex - bufferedElements;
					}

					if (index + bufferSize >= dataLength) {
						index = dataLength - bufferSize;
					}
					indexCorrection = toIndex - index;

					self._loadData(index);
					blockEvent = true;
					offset = index * avgListItemSize;
					if (options.orientation === VERTICAL) {
						element.style.top = offset + "px";
					} else {
						element.style.left = offset + "px";
					}

					for (i = 0; i < indexCorrection; i += 1) {
						offset += _computeElementSize(element.children[i], options.orientation);
					}

					if (options.orientation === VERTICAL) {
					self.ui.scrollview.scrollTop = offset;
					} else {
						self.ui.scrollview.scrollLeft = offset;
					}
					blockEvent = false;
					self._currentIndex = index;
				}

				/**
				 * Orders elements. Controls resultset visibility and does DOM manipulation. This
				 * method is used during normal scrolling.
				 * @method _orderElements
				 * @param {ns.widget.micro.VirtualListview} self VirtualListview widget reference
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _orderElements(self) {
					var element = self.element,
						scrollInfo = self._scroll,
						options = self.options,
						elementStyle = element.style,
						//Current index of data, first element of resultset
						currentIndex = self._currentIndex,
						//Number of items in resultset
						bufferSize = parseInt(options.bufferSize, 10),
						//Total number of items
						dataLength = options.dataLength,
						//Array of scroll direction
						scrollDirection = scrollInfo.direction,
						scrollClipWidth = scrollInfo.clipWidth,
						scrollClipHeight = scrollInfo.clipHeight,
						scrollLastPositionY = scrollInfo.lastPositionY,
						scrollLastPositionX = scrollInfo.lastPositionX,
						elementPositionTop = parseInt(elementStyle.top, 10) || 0,
						elementPositionLeft = parseInt(elementStyle.left, 10) || 0,
						elementsToLoad = 0,
						bufferToLoad = 0,
						elementsLeftToLoad = 0,
						temporaryElement = null,
						avgListItemSize = 0,
						resultsetSize = 0,
						childrenNodes,
						i = 0,
						jump = 0,
						hiddenPart = 0,
						newPosition;

					childrenNodes = element.children;
					for (i = childrenNodes.length - 1; i > 0; i -= 1) {
						if (options.orientation === VERTICAL) {
							resultsetSize += childrenNodes[i].clientHeight;
						} else {
							resultsetSize += childrenNodes[i].clientWidth;
						}
					}
					avgListItemSize = resultsetSize / options.bufferSize;

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling DOWN
					if (scrollDirection[SCROLL_DOWN]) {
						hiddenPart = scrollLastPositionY - elementPositionTop;
						elementsLeftToLoad = dataLength - currentIndex - bufferSize;
					}

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling UP
					if (scrollDirection[SCROLL_UP]) {
						hiddenPart = (elementPositionTop + resultsetSize) - (scrollLastPositionY + scrollClipHeight);
						elementsLeftToLoad = currentIndex;
					}

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling RIGHT
					if (scrollDirection[SCROLL_RIGHT]) {
						hiddenPart = scrollLastPositionX - elementPositionLeft;
						elementsLeftToLoad = dataLength - currentIndex - bufferSize;
					}

					//Compute hidden part of result set and number of elements, that needed to be loaded, while user is scrolling LEFT
					if (scrollDirection[SCROLL_LEFT]) {
						hiddenPart = (elementPositionLeft + resultsetSize) - (scrollLastPositionX - scrollClipWidth);
						elementsLeftToLoad = currentIndex;
					}

					//manipulate DOM only, when at least 2/3 of result set is hidden
					//NOTE: Result Set should be at least 3x bigger then clip size
					if (hiddenPart > 0 && (resultsetSize / hiddenPart) <= 1.5) {

						//Left half of hidden elements still hidden/cached
						elementsToLoad = Math.floor(hiddenPart / avgListItemSize) - Math.floor((bufferSize - scrollClipHeight / avgListItemSize) / 2);
						elementsToLoad = elementsLeftToLoad < elementsToLoad ? elementsLeftToLoad : elementsToLoad;
						bufferToLoad = Math.floor(elementsToLoad / bufferSize);
						elementsToLoad = elementsToLoad % bufferSize;

						// Scrolling more then buffer
						if (bufferToLoad > 0) {
							self._loadData(currentIndex + bufferToLoad * bufferSize);
							if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
								if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
									jump += bufferToLoad * bufferSize * avgListItemSize;
								}

								if (scrollDirection[SCROLL_UP] || scrollDirection[SCROLL_LEFT]) {
									jump -= bufferToLoad * bufferSize * avgListItemSize;
								}
							}
						}


						if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
							//Switch currentIndex to last
							currentIndex = currentIndex + bufferSize - 1;
						}
						for (i = elementsToLoad; i > 0; i -= 1) {
							if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
								temporaryElement = element.appendChild(element.firstElementChild);
								++currentIndex;

								//Updates list item using template
								self._updateListItem(temporaryElement, currentIndex);
								jump += temporaryElement.clientHeight;
							}

							if (scrollDirection[SCROLL_UP] || scrollDirection[SCROLL_LEFT]) {
								temporaryElement = element.insertBefore(element.lastElementChild, element.firstElementChild);
								--currentIndex;

								//Updates list item using template
								self._updateListItem(temporaryElement, currentIndex);
								jump -= temporaryElement.clientHeight;
							}
						}
						if (scrollDirection[SCROLL_UP] || scrollDirection[SCROLL_DOWN]) {
							newPosition = elementPositionTop + jump;

							if (newPosition < 0 || currentIndex <= 0) {
								newPosition = 0;
								currentIndex = 0;
							}

							elementStyle.top = newPosition + "px";
						}

						if (scrollDirection[SCROLL_LEFT] || scrollDirection[SCROLL_RIGHT]) {
							newPosition = elementPositionLeft + jump;

							if (newPosition < 0 || currentIndex <= 0) {
								newPosition = 0;
							}

							elementStyle.left = newPosition + "px";
						}

						if (scrollDirection[SCROLL_DOWN] || scrollDirection[SCROLL_RIGHT]) {
							//Switch currentIndex to first
							currentIndex = currentIndex - bufferSize + 1;
						}
						//Save current index
						self._currentIndex = currentIndex;
					}
				}

				/**
				 * Check if scrolling position is changed and updates list if it needed.
				 * @method _updateList
				 * @param {ns.widget.micro.VirtualListview} self VirtualListview widget reference
				 * @memberOf ns.widget.micro.VirtualListview
				 * @private
				 * @static
				 */
				function _updateList(self) {
					var _scroll = self._scroll;
					_updateScrollInfo.call(null, self);
					if (_scroll.lastJumpY > 0 || _scroll.lastJumpX > 0) {
						if (!blockEvent) {
							_orderElements(self);
						}
					}
				}

				/**
				 * Updates list item using user defined listItemUpdater function.
				 * @method _updateListItem
				 * @param {HTMLElement} element List element to update
				 * @param {number} index Data row index
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._updateListItem = function (element, index) {
					this.options.listItemUpdater(element, index);
				};

				/**
				 * Build widget structure
				 * @method _build
				 * @param {string} template
				 * @param {HTMLElement} element Widget's element
				 * @return {HTMLElement} Element on which built is widget
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._build = function(template, element) {
					var classes = VirtualListview.classes;

					element.classList.add(classes.uiVirtualListContainer);
					return element;
				};


				/**
				 * Initialize widget on an element.
				 * @method _init
				 * @param {HTMLElement} element Widget's element
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._init = function(element) {
					var self = this,
						ui = self.ui,
						options = self.options,
						orientation,
						scrollview,
						scrollviewStyle,
						spacer,
						spacerStyle;

					//Set orientation, default vertical scrolling is allowed
					orientation = options.orientation.toLowerCase() === HORIZONTAL ? HORIZONTAL : VERTICAL;

					//Get scrollview instance
					scrollview = element.parentElement;
					scrollviewStyle = scrollview.style;

					// Prepare spacer (element which makes scrollbar proper size)
					spacer = document.createElement("div");
					spacerStyle = spacer.style;
					spacerStyle.display = "block";
					spacerStyle.position = "static";
					scrollview.appendChild(spacer);

					//Prepare element
					element.style.position = "relative";

					if (orientation === HORIZONTAL) {
						// @TODO check if whiteSpace: nowrap is better for vertical listes
						spacerStyle.float = 'left';
						scrollviewStyle.overflowX = "scroll";
						scrollviewStyle.overflowY = "hidden";
					} else {
						scrollviewStyle.overflowX = "hidden";
						scrollviewStyle.overflowY = "scroll";
					}

					if (options.dataLength < options.bufferSize) {
						options.bufferSize = options.dataLength - 1;
					}

					if (options.bufferSize < 1) {
						options.bufferSize = 1;
					}

					// Assign variables to members
					ui.spacer = spacer;
					ui.scrollview = scrollview;
					self.element = element;
					options.orientation = orientation;
				};

				/**
				 * Builds Virtual List structure
				 * @method _buildList
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._buildList = function() {
					var listItem,
						list = this.element,
						numberOfItems = this.options.bufferSize,
						documentFragment = document.createDocumentFragment(),
						touchStartEventBound = _touchStartHandler.bind(null, this),
						orientation = this.options.orientation,
						i;

					for (i = 0; i < numberOfItems; ++i) {
						listItem = document.createElement("li");

						if (orientation === HORIZONTAL) {
							// TODO: check if whiteSpace: nowrap is better for vertical listes
							// NOTE: after rebuild this condition check possible duplication from _init method
							listItem.style.float = 'left';
						}

						this._updateListItem(listItem, i);
						documentFragment.appendChild(listItem);
						listItem.addEventListener('touchstart', touchStartEventBound, false);
					}

					list.appendChild(documentFragment);
					this._touchStartEventBound = touchStartEventBound;
					this._refresh();
				};

				/**
				 * Refresh list
				 * @method _refresh
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._refresh = function() {
					//Set default value of variable create
					this._refreshScrollbar();
				};

				/**
				 * Loads data from specified index to result set.
				 * @method _loadData
				 * @param {number} index Index of first row
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._loadData = function(index) {
					var children = this.element.firstElementChild;

					if (this._currentIndex !== index) {
						this._currentIndex = index;
						do {
							this._updateListItem(children, index);
							++index;
							children = children.nextElementSibling;
						} while (children);
					}
				};

				/**
				 * Sets proper scrollbar size: height (vertical), width (horizontal)
				 * @method _refreshScrollbar
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._refreshScrollbar = function() {
					var self = this,
						element = self.element,
						options = self.options,
						ui = self.ui,
						spacerStyle = ui.spacer.style,
						bufferSizePx;

					if (options.orientation === VERTICAL) {
						//Note: element.clientHeight is variable
						bufferSizePx = parseFloat(element.clientHeight) || 0;
						spacerStyle.height = (bufferSizePx / options.bufferSize * (options.dataLength - 1) - 4 / 3 * bufferSizePx) + "px";
					} else {
						//Note: element.clientWidth is variable
						bufferSizePx = parseFloat(element.clientWidth) || 0;
						spacerStyle.width = (bufferSizePx / options.bufferSize * (options.dataLength - 1) - 4 / 3 * bufferSizePx) + "px";
					}
				};

				/**
				 * Binds VirtualListview events
				 * @method _bindEvents
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._bindEvents = function() {
					var scrollEventBound = _updateList.bind(null, this),
						scrollviewClip = this.ui.scrollview;

					if (scrollviewClip) {
						scrollviewClip.addEventListener("scroll", scrollEventBound, false);
						this._scrollEventBound = scrollEventBound;
					}
				};

				/**
				 * Cleans widget's resources
				 * @method _destroy
				 * @memberOf ns.widget.micro.VirtualListview
				 * @protected
				 * @instance
				 */
				prototype._destroy = function() {
					var self = this,
						scrollviewClip = self.ui.scrollview,
						uiSpacer = self.ui.spacer,
						element = self.element,
						elementStyle = element.style,
						listItem;

					// Restore start position
					elementStyle.position = "static";
					if (self.options.orientation === VERTICAL) {
						elementStyle.top = "auto";
					} else {
						elementStyle.left = "auto";
					}

					if (scrollviewClip) {
						scrollviewClip.removeEventListener("scroll", self._scrollEventBound, false);
					}

					//Remove spacer element
					if (uiSpacer.parentNode) {
						uiSpacer.parentNode.removeChild(uiSpacer);
					}

					//Remove li elements.
					while (element.firstElementChild) {
						listItem = element.firstElementChild;
						listItem.removeEventListener('touchstart', self._touchStartEventBound, false);
						element.removeChild(listItem);
					}

				};

				/**
				 * Scrolls list to defined position in pixels.
				 * @method scrollTo
				 * @param {number} position Scroll position expressed in pixels.
				 * @memberOf ns.widget.micro.VirtualListview
				 */
				prototype.scrollTo = function(position) {
					this.ui.scrollview.scrollTop = position;
				};

				/**
				 * Scrolls list to defined index.
				 * @method scrollToIndex
				 * @param {number} index Scroll Destination index.
				 * @memberOf ns.widget.micro.VirtualListview
				 */
				prototype.scrollToIndex = function(index) {
					if (index < 0) {
						index = 0;
					}
					if (index >= this.options.dataLength) {
						index = this.options.dataLength - 1;
					}
					_updateScrollInfo(this);
					_orderElementsByIndex(this, index);
				};

				/**
				 * Builds widget
				 * @method draw
				 * @memberOf ns.widget.micro.VirtualListview
				 */
				prototype.draw = function() {
					this._buildList();
					this.trigger('draw');
				};

				/**
				 * Sets list item updater function. To learn how to create list item updater function please
				 * visit Virtual List User Guide
				 * @method setListItemUpdater
				 * @param {Object} updateFunction Function reference.
				 * @memberOf ns.widget.micro.VirtualListview
				 */
				prototype.setListItemUpdater = function(updateFunction) {
					this.options.listItemUpdater = updateFunction;
				};

				// Assign prototype
				VirtualListview.prototype = prototype;

				// definition
				ns.widget.micro.VirtualListview = VirtualListview;

				engine.defineWidget(
						"VirtualListview",
						"",
						"",
						["draw", "setListItemUpdater", "getTopByIndex", "scrollTo", "scrollToIndex"],
						VirtualListview,
						"micro"
						);
				}(window.document, ns));

/*global define */
(function() {
	var newTau = tau.noConflict();
	tau.VirtualListview = newTau.VirtualListview.bind(newTau);
}());

}(window, window.document));
