"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", auth_controller_1.authController.signUp);
router.post("/signin", auth_controller_1.authController.signIn);
router.post("/token", auth_controller_1.authController.token);
exports.authRoutes = router;
