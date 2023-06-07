export const calcRowGroup = (arr: number[], sliceCount: number) => {
  let grids: number[][] = [], // grids 二维数组
    finalArr: number[][] = []; // finalArr 二维数组

  const len = arr.length / sliceCount;

  for (let i = 0; i < len; i++) {
    grids.push(arr.slice(sliceCount * i, sliceCount * (i + 1)));
  }

  const gridsArr: number[][][] = grids.map((gridRows, y) =>
    gridRows.map((grid, x) => [x + 1, y + 1])
  ); // gridsArr 三维数组

  gridsArr.forEach((gridRows) => {
    finalArr = finalArr.concat(gridRows);
  });

  return finalArr;
};
