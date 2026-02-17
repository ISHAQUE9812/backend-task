"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const note_routers_1 = __importDefault(require("./routers/note.routers"));
/* ===============================
   ENV CONFIG
================================ */
dotenv_1.default.config();
/* ===============================
   EXPRESS APP INIT
================================ */
const app = (0, express_1.default)();
/* ===============================
   MIDDLEWARES
================================ */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ===============================
   ROUTES
================================ */
app.use("/api", note_routers_1.default);
/* ===============================
   DATABASE CONNECTION
================================ */
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=app.js.map