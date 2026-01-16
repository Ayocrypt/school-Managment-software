const { z } = require("zod");

// Validation schema for adding/updating a student
// This ensures all required fields are present and have correct types
const StudentSchema = z.object({
    // Optional userId for updates (required for updates, not for new students)
    // Accepts number or string that can be converted to number
    userId: z.union([
        z.number().int().positive("User ID must be a positive integer"),
        z.string().refine((val) => {
            const num = parseInt(val);
            return !isNaN(num) && num > 0;
        }, {
            message: "User ID must be a valid number"
        }).transform((val) => parseInt(val))
    ]).optional(),
    
    // Required fields
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    
    // Optional personal information
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    phone: z.string().optional(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format").optional(),
    
    // Academic information
    class: z.string().optional(),
    section: z.string().optional(),
    // Roll must be a number (integer), not a string
    // Accepts number, string that can be converted to number, null, or undefined
    roll: z.union([
        z.number().int().positive("Roll number must be a positive integer"),
        z.string().refine((val) => {
            // Check if string can be converted to a valid number
            const trimmed = val.trim();
            if (trimmed === '') return true; // Empty string is OK (will be undefined)
            const num = parseInt(trimmed);
            return !isNaN(num) && num > 0;
        }, {
            message: "Roll number must be a valid number (like 1, 2, 3), not text. Please enter a number."
        }).transform((val) => {
            const trimmed = val.trim();
            if (trimmed === '') return undefined;
            return parseInt(trimmed);
        }),
        z.null(),
        z.undefined()
    ]).optional(),
    admissionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Admission date must be in YYYY-MM-DD format").optional(),
    
    // Address information
    currentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    
    // Parent/Guardian information
    fatherName: z.string().optional(),
    fatherPhone: z.string().optional(),
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    relationOfGuardian: z.string().optional(),
    
    // System access
    systemAccess: z.boolean().optional()
});

module.exports = {
    StudentSchema
};
