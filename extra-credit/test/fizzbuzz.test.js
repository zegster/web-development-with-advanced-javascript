const { fizzbuzz, fizzBuzzArray } = require("../src/fizzbuzz");

describe("fizzbuzzArray", () => {
    describe("fizzbuzz", () => {
        it("returns count if count is neither divisble by 3 nor 5", () => {
            expect(fizzbuzz(1)).toEqual(1);
        });

        it("returns fizz if count is divisible by 3 ", () => {
            expect(fizzbuzz(3)).toEqual("fizz");
        });

        it("returns buzz if count is divisible by 5", () => {
            expect(fizzbuzz(10)).toEqual("buzz");
        });

        it("returns fizzbuzz if count is divisible by 3 && count is divisible by 5", () => {
            expect(fizzbuzz(15)).toEqual("fizzbuzz");
        });
    });

    describe("array in which fizzbuzz exists", () => {
        it("if array is empty, returns empty array", () => {
            expect(fizzBuzzArray(0)).toEqual([]);
        });

        it("returns array up to 15, where fizz and buzz are accurately represented. ", () => {
            expect(fizzBuzzArray(15)).toEqual([
                1,
                2,
                "fizz",
                4,
                "buzz",
                "fizz",
                7,
                8,
                "fizz",
                "buzz",
                11,
                "fizz",
                13,
                14,
                "fizzbuzz",
            ]);
        });
    });
});
