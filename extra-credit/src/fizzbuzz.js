const fizzbuzz = (count) => {
    // implement fizzbuzz so that:
    // if count is divisible by 3 it prints fizz
    // if count divisible by 5 print buzz
    // if count divisible by both 3 and 5, print fizzbuzz
    if (count % 3 === 0 && count % 5 === 0) {
        return "fizzbuzz";
    } else if (count % 3 === 0) {
        return "fizz";
    } else if (count % 5 === 0) {
        return "buzz";
    } else {
        return count;
    }
};

const fizzBuzzArray = (count) => {
    // impolements fizzbuzz in an array, such that if
    // 15 is passed in as `count`, then an array
    // is returned with numbers 1 to 15, accurately
    // representing their value as a number,
    // fizz, buzz, or fizzbuzz

    const array_set = [];
    for (var i = 1; i <= count; i++) {
        array_set.push(fizzbuzz(i));
    }
    return array_set;
};

module.exports.fizzbuzz = fizzbuzz;
module.exports.fizzBuzzArray = fizzBuzzArray;
