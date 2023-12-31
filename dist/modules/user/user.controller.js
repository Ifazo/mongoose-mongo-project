"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = require("jsonwebtoken");
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.default.find();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to retrieve users",
            errorMessages: error.message,
        });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_model_1.default.findById(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to retrieve user",
            errorMessages: error.message,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = yield user_model_1.default.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to update user",
            errorMessages: error.message,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to delete user",
            errorMessages: error.message,
        });
    }
});
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id;
        const profile = yield user_model_1.default.findById(userId);
        if (!profile) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Profile not found",
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Profile retrieved successfully",
            data: profile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to get profile",
            errorMessages: error.message,
        });
    }
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = req.headers.authorization;
        const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id;
        const profile = yield user_model_1.default.findByIdAndUpdate(userId, data, { new: true });
        if (!profile) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Profile not found",
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Profile updated successfully",
            data: profile,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to get profile",
            errorMessages: error.message,
        });
    }
});
exports.userController = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
};
