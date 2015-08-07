'use strict';
app.factory('resourceFactory', function($resource) {
  return $resource('http://localhost:24149/users/:id',
          {id: '@_id'},
          {update: {method: 'PUT'},
           remove: {method: 'DELETE'}});
});

app.factory('promiseFactory', function(resourceFactory) {
  var promises = {};

  promises.get = function(id){
    return resourceFactory.get(id).$promise;
  };

  promises.create = function(user) {
    return resourceFactory.save(user).$promise;
  };

  promises.list = function() {
    return resourceFactory.query().$promise;
  };

  promises.remove = function(id) {
    return resourceFactory.remove(id).$promise;
  };

  promises.update = function(user) {
    return resourceFactory.update(user).$promise;
  };
});

app.service('userService', function($rootScope, $stateParams, promiseFactory) {

	var getUsers = function(){
		promiseFactory.list()
			.then(function(users) {
				return users;
			}, function(error) {
				console.log(error);
			});
	};

	function addUser(user) {
		promiseFactory.create(user)
			.then(function() {
				$state.go('users');
        return getUsers();
			}, function(error) {
				console.log(user.email + ' is already being used by another user.');
			});
	}

	function editUser(user) {
		promiseFactory.update(user)
			.then(function(updatedUser) {
				$state.go('users');
        return updatedUser;
			}, function(error) {
				console.log(error);
			});
	}

	function deleteUser(user) {
		promiseFactory.remove({id: user._id})
			.then(function() {
				$state.go('users');
        return getUsers();
			}, function(error) {
				console.log(error);
			});
	}

	return {
    getUsers: getUsers,
		addUser: addUser,
		editUser: editUser,
		deleteUser: deleteUser
	};
});
