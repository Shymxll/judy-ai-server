"use strict";
/**
 * Case model schema
 */
const mongoose = require('mongoose');
const CaseSchema = new mongoose.Schema({
    caseNumber: {
        type: String,
        required: [true, 'Case number is required'],
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Case title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Case description is required']
    },
    plaintiff: {
        type: String,
        required: [true, 'Plaintiff name is required'],
        trim: true
    },
    defendant: {
        type: String,
        required: [true, 'Defendant name is required'],
        trim: true
    },
    caseType: {
        type: String,
        required: [true, 'Case type is required'],
        enum: ['Civil', 'Criminal', 'Family', 'Corporate', 'Other'],
        default: 'Other'
    },
    courtName: {
        type: String,
        required: [true, 'Court name is required'],
        trim: true
    },
    filingDate: {
        type: Date,
        required: [true, 'Filing date is required'],
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Active', 'Closed', 'Appealed', 'Settled'],
        default: 'Pending'
    },
    nextHearingDate: {
        type: Date
    },
    documents: [{
            name: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }],
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Update the updatedAt timestamp before saving
CaseSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
module.exports = mongoose.model('Case', CaseSchema);
