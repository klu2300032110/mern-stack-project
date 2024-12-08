import { useState, useEffect } from "react";
import { Card, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Getcourses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course

    useEffect(() => {
        // Fetch the list of courses
        function callback2(data) {
            // Randomly add instructor and duration to each course
            const updatedCourses = data.courses.map(course => ({
                ...course,
                instructor: getRandomInstructor(),
                duration: getRandomDuration()
            }));
            setCourses(updatedCourses);
        }
        function callback1(res) {
            res.json().then(callback2);
        }
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "id": localStorage.getItem("id") // admin id
            }
        }).then(callback1);
    }, []);

    // Function to handle course click (show modal with course details)
    const handleCourseClick = (course) => {
        setSelectedCourse(course); // Show the course details in the modal
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedCourse(null); // Close the modal by resetting the selected course
    };

    // Randomly generate instructor names
    const getRandomInstructor = () => {
        const instructors = ["John Doe", "Jane Smith", "Emily Johnson", "Michael Brown", "Sarah Davis"];
        const randomIndex = Math.floor(Math.random() * instructors.length);
        return instructors[randomIndex];
    };

    // Randomly generate course duration
    const getRandomDuration = () => {
        const durations = ["3 weeks", "6 weeks", "1 month", "2 months", "4 weeks"];
        const randomIndex = Math.floor(Math.random() * durations.length);
        return durations[randomIndex];
    };

    return (
        <div
            style={{
                marginTop: 20,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {courses.map((course) => (
                <div key={course._id}>
                    {/* Course card */}
                    <Card
                        style={{
                            margin: 10,
                            width: 300,
                            minHeight: 200,
                            padding: 20,
                            cursor: "pointer",
                        }}
                        onClick={() => handleCourseClick(course)} // Pass course object to modal
                    >
                        <Typography textAlign={"center"} variant={"h5"}>
                            {course.title}
                        </Typography>
                        <Typography textAlign={"center"}>{course.description}</Typography>
                        <img src={course.imageLink} style={{ width: 300 }} alt="Course" />
                    </Card>
                </div>
            ))}

            {/* Modal for displaying course details */}
            {selectedCourse && (
                <Dialog open={Boolean(selectedCourse)} onClose={handleCloseModal}>
                    <DialogTitle>{selectedCourse.title}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">{selectedCourse.description}</Typography>
                        <Typography variant="body2"><strong>Instructor:</strong> {selectedCourse.instructor}</Typography>
                        <Typography variant="body2"><strong>Duration:</strong> {selectedCourse.duration}</Typography>
                        <img src={selectedCourse.imageLink} style={{ width: "100%", marginTop: 10 }} alt="Course" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}

export default Getcourses;
