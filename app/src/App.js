import {
  Alert,
  AppBar,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const [link, setLink] = useState("");
  const [data, setData] = useState([{}]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const downloadFile = () => {
    // var file_name = data.name.split(" ").join("_");
    saveAs(`/getfiles?file_name=${data.name}`);
  };

  const pythonExec = () => {
    axios.get(`/convert?link=${link}`).then((res) => {
      setOpen(true);
      setData(res.data);
      console.log(res.data);
    });
  };
  return (
    <div className="App">
      <div className="nav">
        <AppBar>
          <Toolbar>
            <Typography variant="h4">Youtube to mp3 Converter</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div
        className="form"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            mt: "15rem",
            width: "50%",
            height: "50%",
          }}
          elevation={5}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ mb: "2rem" }}>Provide Url here:...</Typography>
            <TextField
              variant="outlined"
              sx={{ mb: "2rem" }}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ mb: "2rem" }}
              onClick={pythonExec}
            >
              Convert
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={data.msg}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={data.code === "failed" ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {data.msg}
              </Alert>
            </Snackbar>
          </CardContent>
        </Card>
      </div>
      <div className="file_download">
        {data.name === undefined ? (
          <div></div>
        ) : (
          <Button
            variant="contained"
            sx={{ mt: "5rem", maxWidth: "20rem" }}
            onClick={downloadFile}
          >
            Download
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
