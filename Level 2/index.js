/**
 * Given array of integers, find its mode. Example For sequence = [1, 3, 3, 3, 1], the output should be
 * arrayMode(sequence) = 3; For sequence = [1, 3, 2, 1], the output should be arrayMode(sequence) = 1. Write a function
 * arrayMode(array) that will perform this operation
 * @param array
 * @returns {*}
 */
function arrayMode(array) {
    let mode = [];
    mode[0] = array[0];
    for (let i = 0; i < array.length; i++) {
        if (!mode[array[i]]) {
            mode[array[i]] = 1;
        } else {
            mode[array[i]]++;
        }
        if (mode[0] < mode[array[i]]) {
            mode[0] = array[i];
        }
        if (array.length === (i + 1)) {
            return mode[0];
        }
    }
}

/**
 * Given an array a that contains only numbers in the range from 1 to a.length, find the first duplicate number for
 * which the second occurrence has the minimal index. In other words, if there are more than 1 duplicated numbers,
 * return the number for which the second occurrence has a smaller index than the second occurrence of the other number
 * does. If there are no such elements, return -1. For a = [2, 1, 3, 5, 3, 2], the output should be firstDuplicate(a)
 * = 3. There are 2 duplicates: numbers 2 and 3. The second occurrence of 3 has a smaller index than the second
 * occurrence of 2 does, so the answer is 3. For a = [2, 4, 3, 5, 1] (No duplicates), the output should be
 * firstDuplicate(a) = -1. Write a function FirstDuplicate(array) that will perform this operation
 * @param array
 * @returns {*}
 * @constructor
 */
function FirstDuplicate(array) {
    let mode = [];
    mode[0] = array[0];
    for (let i = 0; i < array.length; i++) {
        if (!mode[array[i]]) {
            mode[array[i]] = 1;
        } else {
            return array[i];
        }
        if (array.length === (i + 1)) {
            return -1;
        }
    }
}

let sequence = [1, 3, 1, 3, 1, 3];
// Should log out 3
console.log(arrayMode(sequence));
// Should log out 3
console.log(FirstDuplicate(sequence));