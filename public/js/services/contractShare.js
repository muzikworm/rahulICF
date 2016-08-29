app.factory('contractShare', function() {
	var details = {};
	var reviewDetails = {};
	
	function setDetails(data) {
		details = data;
	}
	
	function getDetails() {
		return details;
	}
	
	function setReviewDetails(data) {
		reviewDetails = data;
	}
	
	function getReviewDetails() {
	return reviewDetails;
	}

	return {
		setDetails: setDetails,
		getDetails: getDetails,
		setReviewDetails: setReviewDetails,
		getReviewDetails: getReviewDetails

	}

});