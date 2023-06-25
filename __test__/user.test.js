/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { constants } = require("../constants");
const { userRegister, userLogin } = require("../controllers/UserRegister");

jest.mock("../models/user");
jest.mock("bcrypt");
describe("userRegister", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should register a new user", async () => {
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
        const expectedUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
        };

        user.findOne.mockResolvedValue(null);
        bcrypt.genSalt.mockResolvedValue(salt);
        bcrypt.hash.mockResolvedValue(hashedPassword);
        user.create.mockResolvedValue(expectedUser);

        await userRegister(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, salt);
        expect(user.create).toHaveBeenCalledWith(expectedUser);
        expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFUL_POST);
        expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    test("should return a validation error if any field is missing on user registering process", async () => {
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

        await userRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: "All fields are mandatory" });
    });

    test("should return a validation error if user already exists", async () => {
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

        user.findOne.mockResolvedValue({ email: req.body.email });

        await userRegister(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(constants.VALIDATION_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: "You are already registered" });
    });
});

jest.mock("../models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
describe("userLogin", () => {
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
        const mockUser = {
            _id: "123",
            email: "user@example.com",
            password: "123456", // hashed "password"
        };

        user.findOne.mockResolvedValue(mockUser);

        // Mock bcrypt.compare to return true
        bcrypt.compare.mockResolvedValue(true);

        await userLogin(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
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
        await userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.UNAUTHORIZED);
    });
});
