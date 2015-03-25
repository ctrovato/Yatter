app.controller('usersController', 
	function($scope, $location, $firebase, $firebaseAuth, $rootScope){
		var url = 'https://yatter.firebaseio.com/' 
		var ref = new Firebase(url); 
		var posts = $firebase(ref);
		$scope.users = posts.$asArray();


		$scope.authObj = $firebaseAuth(ref);
		$scope.editingProfile = true;

		$scope.authObj.$onAuth(function(authData) {
			if (authData) {
				var userRef =  new Firebase(url + "users/" + authData.uid);
				$scope.sync = $firebase(userRef);
				$rootScope.currentUser = $scope.sync.$asObject()

				$rootScope.currentUser.$loaded().then(function(){
					$scope.user = {};
					$scope.user.firstname = $rootScope.currentUser.firstname;
					$scope.user.lastname = $rootScope.currentUser.lastname;
					$scope.user.email = $rootScope.currentUser.email;
				
					console.log("logged in", $scope.currentUser);
				});

				

			} else {
				console.log("Logged out");
			}
		});

		$scope.updateProfile = function(){
			console.log("hello", $scope.user.firstname);
			$rootScope.currentUser.firstname = $scope.user.firstname;
			$rootScope.currentUser.lastname = $scope.user.lastname;
			// $rootScope.currentUser.email = $scope.user.email;
			$rootScope.currentUser.location = $scope.location;
			$rootScope.currentUser.userUrl = $scope.userUrl;
			$rootScope.currentUser.biography = $scope.biography;


			$rootScope.currentUser.$save().then(function(){
				// $scope.location = '';
				// $scope.userUrl = '';
				// $scope.biography = '';
				// $scope.postForm.$setUntouched();
			})

			$scope.editingProfile = false;
			console.log($scope.editingProfile);


		
		} //updateProfile()


		$scope.editProfile=function(){
			$scope.editingProfile = true;
		}

		

});
