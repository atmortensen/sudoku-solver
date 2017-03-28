// CONTROLLER
app.controller('mainCtrl', ['$scope', 'mainService', function($scope, mainService){

	$scope.reset = function(){
		$scope.puzzle = [["8",null,null,null,null,null,null,null,null],[null,null,"3","6","",null,null,null,null],[null,"7",null,null,"9",null,"2",null,null],[null,"5",null,null,null,"7",null,null,null],[null,null,null,null,"4","5","7",null,null],[null,null,null,"1",null,null,null,"3",null],[null,null,"1",null,null,null,null,"6","8"],[null,null,"8","5",null,null,null,"1",null],[null,"9",null,null,null,null,"4",null,null]];
	     // $scope.puzzle = [[null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null],
	     // 	             [null,null,null,null,null,null,null,null,null]];

		$scope.error = '';
		$scope.message = '';
	}; 
	$scope.reset();
	$scope.entered = JSON.parse(JSON.stringify($scope.puzzle));

	$scope.isNum = function(num){
		if(num){
			return (!String(num).match(/[1-9]/));
		} else { return false; }
		
	};

	$scope.solve = function(puzzle){
		$scope.entered = JSON.parse(JSON.stringify(puzzle));
		var puzzleObj = mainService.solve(puzzle);
		$scope.puzzle = puzzleObj.puzzle;
		$scope.message = puzzleObj.message;
		$scope.error = puzzleObj.error;
	};
	
}]);