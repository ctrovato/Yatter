app.controller('PostsController', 
	function($scope, $firebase, $firebaseAuth, $rootScope){

		var url = 'https://yatter.firebaseio.com/';
		var ref = new Firebase(url);
		
		var ref_posts = new Firebase(url+"posts/");  
		var posts = $firebase(ref_posts);
		$scope.posts = posts.$asArray();

		$scope.authObj = $firebaseAuth(ref);

		$scope.authObj.$onAuth(function(authData) {
			if (authData) {
				var userRef =  new Firebase( url + "users/" + authData.uid);
				$scope.sync = $firebase(userRef);
				$rootScope.currentUser = $scope.sync.$asObject();
				
				console.log("logged in posts ", $rootScope.currentUser);

			} else {
				$location.path("/login");
			}
		});

		console.log($rootScope.currentUser);

		$scope.addPost = function(){

			console.log($scope.posts);
			$scope.posts.$add({
				firstname: $rootScope.currentUser.firstname,
				uid: $rootScope.currentUser.uid,
				title: $scope.title,
				description: $scope.description,
				content: $scope.content,
				date: Firebase.ServerValue.TIMESTAMP

			}).then(function(){
				$scope.title = '';
				$scope.description = '';
				$scope.content = '';
				$scope.postForm.$setUntouched();
			})
		
			$rootScope.currentUser.points += 100;
			$rootScope.currentUser.$save();
		
		} //addPost


		$scope.likePost = function(){
			console.log($scope.posts);
			$scope.posts.$add({
				uid: $rootScope.currentUser.uid,
			});

			$rootScope.post.uid.points += 50;
			$rootScope.currentUser.$save();
		
		} //likePost




		$scope.deletePost = function(key){
			console.log(key);
			 posts.$remove(key);
		} //deletePost


}); //PostsController


