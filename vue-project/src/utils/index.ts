export function getCombinations<T = string>(elements: T[]): Array<T[]> {
  const result: Array<T[]> = [];

  function searchCombination(start: number, curr: T[]) {
    if (curr.length > 1) {
      result.push(curr);
    }

    for (let i = start; i < elements.length; i++) {
      searchCombination(i + 1, [...curr, elements[i]]);
    }
  }

  searchCombination(0, []);

  return result;
}
