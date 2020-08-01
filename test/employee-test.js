const employee = require("../lib/employee");
const intern = require("../lib/intern");

describe("employee", () => {
    it("Can initiate employee instance", () => {
        const e = new employee();
        expect(typeof (e)).toBe("object");
    });

    it("Can set name via constructor arguments", () => {
        const name = "Greg";
        const e = new employee(name);
        expect(e.name).toBe(name);
    });

    it("Can set id via constructor argument", () => {
        const testValue = 575;
        const e = new employee("Bar", textValue);
        expect(e.id).toBe(testValue);
    });

    it("Can set email via constructor argument", () => {
        const testValue = "test@test.com";
        const e = new employee("Bar", 1, testValue);
        expect(e.email).toBe(testValue);
    });

    describe("getName", () => {
        it("Can get name via getName()", () => {
            const testValue = "Greg";
            const e = new employee(testValue);
            expect(e.getName()).toBe(testValue);
        });
    });

    describe("getId", () => {
        it("Can get id via getId()", () => {
            const testValue = 575;
            const e = new employee("Bar", testValue);
            expect(e.getId()).toBe(testValue);
        });
    });

    describe("getEmail", () => {
        it("Can get email via getEmail()", () => {
            const testValue = "test@test.com";
            const e = new employee("Bar", 1, testValue);
            expect(e.getEmail()).toBe(testValue);
        });
    });
    
    describe("getRole", () => {
        it("getRole() shourl return\"Employee\"", () => {
            const testValue = "Employee";
            const e = new employee("Greg", 1, "test@test.com");
            expect(e.getRole()).toBe(testValue);
        });
    });
});
