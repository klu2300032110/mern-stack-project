import { Card, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";  
import TextField from "@mui/material/TextField";
import axios from 'axios';
import { useState } from "react";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/admin/login", {
                username: email,
                password: password
            }, {
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            window.location = "/";  // Redirect to homepage after successful login
        } catch (error) {
            // If login fails, show error message in dialog
            if (error.response && error.response.data) {
                setErrorMessage("Incorrect email or password. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
            setOpenDialog(true);
        }
    };

    return (
        <>
            <div style={{ paddingTop: 150, paddingBottom: 20, display: "flex", justifyContent: "center" }}>
                <Typography variant="h4">Welcome to Online Learning</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br /><br />
                    <Button
                        variant="contained"
                        onClick={handleSignin}
                    >
                        Signin
                    </Button>
                </Card>
            </div>

            {/* Dialog for error notification */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{errorMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Signin;
