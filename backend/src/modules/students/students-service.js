const { ApiError, sendAccountVerificationEmail } = require("../../utils");
const { findAllStudents, findStudentDetail, findStudentToSetStatus, addOrUpdateStudent, deleteStudent } = require("./students-repository");
const { findUserById } = require("../../shared/repository");
const { StudentSchema } = require("./students-schema");

const checkStudentId = async (id) => {
    const isStudentFound = await findUserById(id);
    if (!isStudentFound) {
        throw new ApiError(404, "Student not found");
    }
}

const getAllStudents = async (payload) => {
    const students = await findAllStudents(payload);
    if (students.length <= 0) {
        throw new ApiError(404, "Students not found");
    }

    return students;
}

const getStudentDetail = async (id) => {
    await checkStudentId(id);

    const student = await findStudentDetail(id);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return student;
}

const addNewStudent = async (payload) => {
    const ADD_STUDENT_AND_EMAIL_SEND_SUCCESS = "Student added and verification email sent successfully.";
    const ADD_STUDENT_AND_BUT_EMAIL_SEND_FAIL = "Student added, but failed to send verification email.";
    
    try {
        // Validate the payload against the schema before processing
        // This will throw a ZodError if validation fails, which we'll catch and format nicely
        const validatedPayload = StudentSchema.parse(payload);
        
        // Call the database function with validated payload
        const result = await addOrUpdateStudent(validatedPayload);
        console.log("Database function result:", JSON.stringify(result, null, 2));
        
        // Check if database operation was successful
        if (!result.status) {
            const errorMessage = result.message || result.description || "Failed to add student";
            console.error("Student add failed - Database returned:", errorMessage);
            throw new ApiError(400, errorMessage); // Use 400 for validation/business logic errors
        }

        // Send email in background (non-blocking) - don't wait for it
        sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email })
            .then(() => {
                console.log(`Verification email sent to ${payload.email}`);
            })
            .catch((error) => {
                console.error(`Failed to send verification email to ${payload.email}:`, error.message);
            });

        // Return immediately - don't wait for email
        return { message: ADD_STUDENT_AND_EMAIL_SEND_SUCCESS };
    } catch (error) {
        // Handle Zod validation errors - format them nicely for the user
        if (error.name === 'ZodError') {
            const errorMessages = error.errors.map(err => {
                const field = err.path.join('.');
                return `${field}: ${err.message}`;
            });
            const formattedMessage = `Validation failed: ${errorMessages.join(', ')}`;
            console.error("Student validation error:", formattedMessage);
            throw new ApiError(400, formattedMessage);
        }
        
        // Preserve original error message if it's an ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        
        // Log the actual error for debugging
        console.error("Error adding student:", error);
        throw new ApiError(500, error.message || "Unable to add student");
    }
}

const updateStudent = async (payload) => {
    try {
        // Validate the payload before updating
        // userId is required for updates
        if (!payload.userId) {
            throw new ApiError(400, "Student ID is required for update");
        }
        
        // Validate the payload against the schema
        const validatedPayload = StudentSchema.parse(payload);
        
        // Call the database function with validated payload
        const result = await addOrUpdateStudent(validatedPayload);
        
        // Check if database operation was successful
        if (!result.status) {
            throw new ApiError(400, result.message || "Failed to update student");
        }

        return { message: result.message };
    } catch (error) {
        // Handle Zod validation errors
        if (error.name === 'ZodError') {
            const errorMessages = error.errors.map(err => {
                const field = err.path.join('.');
                return `${field}: ${err.message}`;
            });
            const formattedMessage = `Validation failed: ${errorMessages.join(', ')}`;
            console.error("Student update validation error:", formattedMessage);
            throw new ApiError(400, formattedMessage);
        }
        
        // Preserve original error message if it's an ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        
        // Log and throw generic error
        console.error("Error updating student:", error);
        throw new ApiError(500, error.message || "Unable to update student");
    }
}

const setStudentStatus = async ({ userId, reviewerId, status }) => {
    await checkStudentId(userId);

    const affectedRow = await findStudentToSetStatus({ userId, reviewerId, status });
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to disable student");
    }

    return { message: "Student status changed successfully" };
}

const deleteStudentById = async (id) => {
    // Check if student exists before attempting to delete
    await checkStudentId(id);

    // Delete the student (both user and user_profile records)
    // The repository function handles deleting both user_profiles and users records
    const affectedRow = await deleteStudent(id);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to delete student");
    }

    return { message: "Student deleted successfully" };
}

module.exports = {
    getAllStudents,
    getStudentDetail,
    addNewStudent,
    setStudentStatus,
    updateStudent,
    deleteStudent: deleteStudentById,
};
