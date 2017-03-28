// SERVICE
app.service('mainService', function(){
	
	this.solve = function(puzzle){

		return sudoku(puzzle);

		function check(row, column, square, currentVal){
		  var comb = row.concat(column, square);
		  var x = ['1','2','3','4','5','6','7','8','9'].find(num => {
		    if(num>currentVal && comb.indexOf(num)===-1){
		      return true;
		    } else { return false; }
		  });
		  return x;
		}

		function getSquare(row, col, puzzle){
		  row = Math.floor(row/3)*3;
		  col = Math.floor(col/3)*3;
		  var square = [];
		  for(var i=0; i<3; i++){
		    for(var ii=0; ii<3; ii++){
		      square.push(puzzle[i+row][ii+col]);
		    }
		  }
		  return square;
		}

		function getColumn(puzzle, col){
			return puzzle.map(arr => arr[col]);
		}

		function sudoku(puzzle) {
		  var original = JSON.parse(JSON.stringify(puzzle));
		  var backTrack = false;
		  var steps = 0;
		    // ROW LOOP
		    for(var row=0; row<puzzle.length; row++){
		        // COLUMN LOOP
		    	for(var col=0; col<puzzle[row].length; col++){
		    		var thisRow = puzzle[row];
			      	var thisBox = thisRow[col];
			      	// MAKE SURE CURRENT VALUE IS VALID
			      	if(thisBox && !String(thisBox).match(/[1-9]/)){
			      		message = 'There is an invalid character in your puzzle!';
			      		return {
			      			puzzle: puzzle,
			      			message: message
			      		};
			      	}
			      	// CHECK IF BOX IS ALREADY DETERMINED
			        if(!original[row][col]){
			          var thisCol = getColumn(puzzle, col);
			          var thisSquare = getSquare(row,col,puzzle);
			          var newVal = check(thisRow, thisCol, thisSquare, thisBox);
			          steps++;
			          // CHECK IF IT FOUND A NEWVAL, IF NOT FOUND BACKTRACK
			          if(newVal){
			          	thisRow[col] = newVal;
			          	backTrack = false;
			          } else {
			          	thisRow[col] = null;
			          	backTrack = true;
			          	col-=2;
			          	if(col<-1){ 
			          		row-= 1; 
			          		col = 7;
			          	}
			          	if(row<0){
			          		message = 'Puzzle can not be solved.';
			          		return {
			          			puzzle: puzzle,
			          			message: message
			          		};
			          	}
			          }
			        } 
			        // IF IT IS ALREADY DETERMINED AND BACKTRACK IS TRUE GO BACK AGAIN
			        else {
			        	if(backTrack){
			        		col-=2;
				        	if(col<-1){ 
				        		row-= 1; 
				        		col = 7;
				        	}
				        }
				        if(row<0){
			          		message = 'Puzzle can not be solved.';
			          		return {
			          			puzzle: puzzle,
			          			message: message
			          		};
			          	}
			        }
		        }   
		    }
		    message = 'Puzzle completed in ' + steps.toLocaleString('en-US') + ' steps.';
		    return {
		    	puzzle: puzzle,
		    	message: message
		    };
		}
	};

	

});