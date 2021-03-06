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
				
				console.log("logged in posts ", $rootScope.currentUser); //logging $rootScope.currentUsers

			} else {
				$location.path("/login");
			}
		});

		console.log($rootScope.currentUser);  //logging $rootScope.currentUsers

		$scope.addPost = function(){

			console.log($scope.posts); //logging $scope.posts
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


			// the currentUser will recieve points for creating and posting a message
			$rootScope.currentUser.points += 100;
			$rootScope.currentUser.$save();
		
		} //addPost


		$scope.likePost = function(post){
			if (post.likes == null){
				post.likes = 0;
			}
			post.likes++
			console.log(post) //logging posts
			$scope.posts.$save(post)
			// $rootScope.like.uid.points += 50;

		} //likePost




		$scope.deletePost = function(key){
			console.log(key);
			 posts.$remove(key);
		} //deletePost


}); //PostsController


