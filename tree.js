import { mergeSort } from "./mergesort.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Sort array
    array = mergeSort(array);
    // Remove duplicates
    const filteredArray = array.filter(
      (_, index) => array[index] !== array[index - 1]
    );
    console.log(filteredArray);
    // remove duplicates
  }
}
