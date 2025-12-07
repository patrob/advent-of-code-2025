import { parseGrid, parseLines } from '../utils/parsing.js';
import type { Solution } from '../types.js';
import { Point } from '@utils/algorithms.js';

export type Node = {
  point: Point;
  type: string;
};

export const parseNode = (type: string, row: number, col: number): Node => ({type, point: {x: col, y: row}});
export const countSurroundingChars = (nodes: Node[][], currentLoc: Point, searchChar: string): number => {
  const checkVectors: Point[] = [
    {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
    {x: -1, y: 0}, {x: 1, y: 0},
    {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
  ];

  let findCount = 0;
  checkVectors.forEach(direction => {
    const x = currentLoc.x + direction.x;
    const y = currentLoc.y + direction.y;
    if (y < 0 || y > nodes.length - 1) return;
    if (x < 0 || x > nodes[y].length - 1) return;
    if (nodes[y][x].type === searchChar) findCount++;
  });
  return findCount;
}

export const part1: Solution = (input: string): number | string => {
  const nodeRows = parseGrid(input).map((arr, row) => arr.map((char, col) => parseNode(char, row, col)));
  let nodesWith3OrLessAdjacents = 0;
  nodeRows.forEach((nodeRow, row) => {
    nodeRow.forEach((nodeCol, col) => {
      if (nodeCol.type === '@' && countSurroundingChars(nodeRows, ({x: col, y: row}), '@') < 4) nodesWith3OrLessAdjacents++;
    })
  });

  return nodesWith3OrLessAdjacents;
};

export const part2: Solution = (input: string): number | string => {
  const nodeRows = parseGrid(input).map((arr, row) => arr.map((char, col) => parseNode(char, row, col)));
  let removedNodes = 0;
  let availableNodesLeft = Number.MAX_VALUE;
  while (availableNodesLeft > 0) {

    let nodesWith3OrLessAdjacents = 0;
    nodeRows.forEach((nodeRow, row) => {
      nodeRow.forEach((nodeCol, col) => {
        if (nodeCol.type === '@' && countSurroundingChars(nodeRows, ({x: col, y: row}), '@') < 4) {
          nodesWith3OrLessAdjacents++;
          nodeCol.type = '.';
          removedNodes++;
        }
      })
    });

    availableNodesLeft = nodesWith3OrLessAdjacents;
  }
  

  return removedNodes;
};
