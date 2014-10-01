var initializeTGMMessage = function(data) {
	console.log('initialize message');
	var my = {}, that = {};
	function initializePrivateMembers() {
		var messageses = data.split("#~#");
		if (messageses.length === 6) {
			my.msTitle = messageses[0];
			my.msSubtitle = messageses[1];
			my.msContent = messageses[2].replace(/~;/g, "<br><br>");
			my.msTripId = messageses[3];
			my.msMode = messageses[4];
			my.msDisplayMode = messageses[5];
			my.receivedDate = new Date();
		} else {
			throw {
				name: 'InvalidArgumentException',
				message: 'The data argument is not valid.'
			};
		}
	}
	initializePrivateMembers();
	
	function initializePublicMembers() {
		that.getTitle = function() {
			return my.msTitle;
		};
		
		that.getSubtitle = function() {
			return my.msSubtitle;
		};
		
		that.getContent = function() {
			return my.msContent;
		};
		
		that.getTripId = function() {
			return my.msTripId;
		};
		
		that.getMode = function() {
			return my.msMode;
		};
		
		that.getDisplayMode =  function() {
			return my.msDisplayMode;
		};
		
		that.getReceivedDateInString = function() {
			var hours = my.receivedDate.getHours(),
				minutes = my.receivedDate.getMinutes();
			return (hours < 10 ? "0" + hours : hours) + ":" 
				+ (minutes < 10 ? "0" + minutes : minutes);
		};
		
		that.getIconPath = function() {
			var src = null;
			switch (my.msMode) {
			case 'bus':
				src = "images/icon-bus.png";
				break;
			case 'train':
				src = "images/icon-train.png";
				break;
			case 'ferry':
				src = "images/icon-ferry.png";
				break;
			case 'subway':
				src = "images/icon-subway.png";
				break;
			case 'tram':
				src = "icon-tram.png";
				break;
			case 'cablecar':
				src = "images/icon-cablecar.png";
				break;
			case 'car':
				src = "images/icon-car.png";
				break;
			case 'motorbike':
				src = "images/icon-motor.png";
				break;
			case 'bicycle':
				src = "images/icon-bycicle.png";
				break;
			case 'monorail':
				src = "images/icon-mono.png";
				break;
			case 'taxi':
				src = "images/icon-taxi.png";
				break;
			case 'parking':
				src = "images/icon-parking.png";
				break;
			case 'toll':
				src = "images/icon-toll.png";
				break;
			case 'walk':
				src = "images/icon-walking.png";
				break;
			case 'shuttlebus':
				src = "images/icon-shuttlebus.png";
				break;

			default:
				src = "images/icon-walking.png";
				break;
			}
			
			return src;
		};
	}
	initializePublicMembers();
	return that;
};