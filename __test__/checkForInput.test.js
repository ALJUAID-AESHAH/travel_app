import { checkForInput } from '../src/client/js/validation'


describe("Testing the submit functionality", () => {
    test("Testing the checkForInput() function", () => {
        expect(checkForInput).toBeDefined();
    })

    test("Testing the checkUrl function return false for invalid url", () => {
        expect(checkForInput(" ")).toBeFalsy();
    });

    test("Testing the checkUrl function return true for valid url", () => {
        expect(checkForInput("https://jamesclear.com/articles")).toBeTruthy();
    });
});
