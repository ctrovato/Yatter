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
				$rootScope.currentUser = $scope.sync.$asObject();

				$scope.firstname = $scope.currentUser.firstname;
				$scope.lastname = $scope.currentUser.lastname;
				$scope.email = $scope.currentUser.email;
				
				console.log($scope.currentUser);

			} else {
				console.log("Logged out");
			}
		});


		$scope.updateProfile = function(){
			console.log("hello");
			$scope.currentUser.firstname = $scope.firstname;
			$scope.currentUser.lastname = $scope.lastname;
			$scope.currentUser.email = $scope.email;
			$scope.currentUser.location = $scope.location;
			$scope.currentUser.userUrl = $scope.userUrl;
			$scope.currentUser.biography = $scope.biography;


			$scope.currentUser.$save().then(function(){
				$scope.location = '';
				$scope.userUrl = '';
				$scope.biography = '';
				$scope.postForm.$setUntouched();
			})

			$scope.editingProfile = false;
						consol.log($scope.editingProfile);


		
		} //updateProfile()


		$scope.editProfile=function(){
			$scope.editingProfile = true;
		}

		

});
