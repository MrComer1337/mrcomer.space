window.addEventListener('load', function() {
	const urlParams = new URLSearchParams(window.location.search);
	const amount = urlParams.get('amount');
	const comment = urlParams.get('comment');
	const encodedComment = encodeURIComponent(comment);
	
	const baseUrl = 'https://oplata.qiwi.com/create?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPqSyMEHx82WJQEo15Ux5FdcAe54a6BhNfxD11YHSxRtE1H8FbAhxzNQcsbTMVkYT4X2ZGU2FfXn4fcsHVQy5z6eAYshg1QUJJ9WYuwpUM4';
	const updatedUrl = baseUrl + '&amount=' + amount + '&comment=' + encodedComment;
	
	window.location = updatedUrl;
});