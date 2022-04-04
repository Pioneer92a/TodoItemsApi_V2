"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    Task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Task = mongoose.model('Task', taskSchema);
exports.Task = Task;
//# sourceMappingURL=task.js.map