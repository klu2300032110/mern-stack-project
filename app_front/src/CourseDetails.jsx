import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/admin/course/${courseId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
      })
      .catch((error) => console.error("Error fetching course details:", error));
  }, [courseId]);

  if (!course) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
      <Card style={{ padding: 20, width: "80%", maxWidth: 900 }}>
        <Typography variant="h4" textAlign="center">
          {course.title}
        </Typography>
        <Typography variant="h6" textAlign="center" style={{ margin: "10px 0" }}>
          {course.description}
        </Typography>
        <img src={course.imageLink} alt={course.title} style={{ width: "100%", height: "auto" }} />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Price: Rs {course.price}
        </Typography>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          {course.longDescription || "No additional details available."}
        </Typography>
      </Card>
    </div>
  );
}

export default CourseDetails;
