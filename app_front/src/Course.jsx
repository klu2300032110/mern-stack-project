import { Card, Grid, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { atom, useRecoilState } from "recoil";

// Defining the atom
const atomCourses = atom({
  key: 'atomCourses',
  default: null,  // Change default to null to handle undefined state
});

function Course() {
  let { courseId } = useParams();
  const [course, setCourses] = useRecoilState(atomCourses);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/course/" + courseId, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    }).then(res => {
      setCourses(res.data.course);
    })
  }, [courseId, setCourses]);

  if (!course) {
    return <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
      <Typography variant={"h6"}>Loading....</Typography>
    </div>
  }

  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourses={setCourses} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper({ title }) {
  return <div style={{ marginTop: 20, height: 250, background: "#eeeee8", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
    <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <Typography style={{ color: "black", fontWeight: 600 }} variant="h3" textAlign={"center"}>
        {title}
      </Typography>
    </div>
  </div>
}

function UpdateCard({ course, setCourses }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  const handleUpdate = async () => {
    try {
      const response = await axios.put("http://localhost:3000/admin/courses/" + course._id, {
        user_id: localStorage.getItem("id"),
        title,
        description,
        imageLink: image,
        published: true,
        price
      }, {
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      let updatedCourse = {
        ...course,
        title,
        description,
        imageLink: image,
        price
      };

      setCourses(updatedCourse);  // Update course using Recoil
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => setImage(e.target.value)}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />

          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button variant="contained" onClick={handleUpdate}>Update course</Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
      <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
      }}>
        <img src={course.imageLink} style={{ width: 350 }} alt="course" />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {course.price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Course;
