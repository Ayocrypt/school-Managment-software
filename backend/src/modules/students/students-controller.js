const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const payload = { name, className, section, roll };
    const students = await getAllStudents(payload);
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    // Extract the student data from the request body
    const payload = req.body;
    console.log("Adding student with payload:", JSON.stringify(payload, null, 2));
    
    // Call the service function which will validate and add the student
    // Validation errors will be caught by asyncHandler and returned to the client
    const message = await addNewStudent(payload);
    console.log("Student added successfully:", message);
    
    // Return success response to the client
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    // Extract student ID from URL parameter and convert to number
    // URL parameters are always strings, so we need to convert to integer
    const { id } = req.params;
    const userId = parseInt(id, 10);
    
    // Validate that the ID is a valid number
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid student ID. Must be a number." });
    }
    
    // Extract the student data from the request body
    const payload = req.body;
    
    // Merge the userId into the payload for the service layer
    // The service will validate the complete payload including userId
    const message = await updateStudent({ ...payload, userId });
    
    // Return success response to the client
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const { status } = req.body;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    // Extract student ID from URL parameter and convert to number
    // URL parameters are always strings, so we need to convert to integer
    const { id } = req.params;
    const studentId = parseInt(id, 10);
    
    // Validate that the ID is a valid number
    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID. Must be a number." });
    }
    
    // Call the service function to delete the student
    // The service will validate that the student exists before deleting
    const message = await deleteStudent(studentId);
    
    // Return success response to the client
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent,
};
