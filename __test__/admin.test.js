/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const { constants } = require("../constants");
const { adminLogin, adminRegister } = require("../controllers/AdminRegister");

jest.mock("../models/admin");
jest.mock("bcrypt");
describe("adminRegister", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should register a new admin", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "password123",
                mobile: "1234567890",
                gender: "male",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const expectedAdmin = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
        };

        admin.findOne.mockResolvedValue(null);
        bcrypt.genSalt.mockResolvedValue(salt);
        bcrypt.hash.mockResolvedValue(hashedPassword);
        admin.create.mockResolvedValue(expectedAdmin);

        await adminRegister(req, res);

        expect(admin.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, salt);
        expect(admin.create).toHaveBeenCalledWith(expectedAdmin);
        expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFUL_POST);
        expect(res.json).toHaveBeenCalledWith(expectedAdmin);
    });

    test("should return a validation error if any field is missing on admin registering process", async () => {
        const req = {
            body: {
                name: "John Doe",
                password: "password123",
                mobile: "1234567890",
                gender: "male",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await adminRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: "All fields are mandatory" });
    });

    test("should return a validation error if admin already exists", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "password123",
                mobile: "1234567890",
                gender: "male",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        admin.findOne.mockResolvedValue({ email: req.body.email });

        await adminRegister(req, res);

        expect(admin.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: "You are already registered" });
    });
});

jest.mock("../models/admin");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
describe("adminLogin", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("Should return access token if password and email is correct", async () => {
        const req = {
            body: {
                email: "Dineshndr@gmail.com",
                password: "password",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mockAdmin = {
            _id: "123",
            email: "admin@example.com",
            password: "123456", // hashed "password"
        };

        admin.findOne.mockResolvedValue(mockAdmin);

        // Mock bcrypt.compare to return true
        bcrypt.compare.mockResolvedValue(true);

        await adminLogin(req, res);

        expect(admin.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockAdmin.password);
        expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFUL_REQUEST);
    });
    test("Error if password or email is missing", async () => {
        const req = {
            body: {
                email: "test@example.com",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
        };
        await adminLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.UNAUTHORIZED);
    });
});
