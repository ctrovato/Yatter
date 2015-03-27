app.controller('RegistrationController', 
	function($scope, $location, $firebase, $firebaseAuth, $rootScope){

		var url = 'https://yatter.firebaseio.com/' 
		var ref = new Firebase(url); 
		var posts = $firebase(ref);

		$scope.authObj = $firebaseAuth(ref);

		var userRef =  new Firebase(url + "users/");

		$scope.sync = $firebase(userRef);
		$scope.newUser = $scope.sync.$asObject();


	$scope.register = function(){

		$scope.authObj.$createUser({
			email: $scope.user.email,
			password: $scope.user.password
		})
		.then(function(){

			return $scope.authObj.$authWithPassword({
				email: $scope.user.email,
				password: $scope.user.password
			}); 
		})
		.then(function(authData){
			$rootScope.authData = authData;
			console.log("data", authData);   //logging authData

			$scope.sync
			.$set(authData.uid, {
				uid: authData.uid,
				firstname: $scope.user.firstname,
				lastname: $scope.user.lastname,
				email: $scope.user.email
			});

			$rootScope.currentUser = authData
			$location.path('/userProfile');
		})
	}

	$scope.login = function(){

		$scope.authObj.$authWithPassword({
			email: $scope.user.email,
			password: $scope.user.password})
			//authentication for firebase if currentUser = authData will send to PostFeed
			//catch if $scope.authError=error.message; will send to Login
			.then(function(authData) {
				$rootScope.currentUser = authData
				$location.path('/postsFeed');
			}).catch(function(error) {
				console.log(error);  //logging authData
				$scope.authError=error.message;
				$location.path('/login');
			});
	}

	$scope.go = function (path) {
  		
  		$location.path( "/register" );
}


// var userRef =  new Firebase(url + "users/" +rootScope.authData.uid);

// 		$scope.sync = $firebase(userRef);




}); // RegistrationController