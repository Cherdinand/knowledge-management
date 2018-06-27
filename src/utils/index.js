export const calcRowGroup = (arr, sliceCount) => {
  let grids = [], finalArr;
  
  const len = arr.length / sliceCount;
  
  for(let i = 0; i < len; i++){
    grids.push(arr.slice(sliceCount*i, sliceCount*(i + 1)))
  }
  
  const gridsArr = grids.map((gridRows, y) => gridRows.map((grid, x) => ([x+1, y+1])));
  
  gridsArr.map((gridRows,i) => {
    if(i === 0){
      finalArr = gridRows;
    }else {
      finalArr = finalArr.concat(gridRows)
    }
  });
  
  return finalArr;
}