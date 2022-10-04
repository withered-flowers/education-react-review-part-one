import React, { useState } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
} from "@mui/material";

import githubInstance from "../apis/github";

const FormAddRepository = () => {
  const [repoStatus, setRepoStatus] = useState(false); // set awalnya jadi public
  const [repoName, setRepoName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const textFieldOnChangeHandler = (evt) => {
    setRepoName(evt.target.value);
  };

  const selectOnChangeHandler = (evt) => {
    setRepoStatus(evt.target.value);
  };

  const formOnSubmitHandler = async (evt) => {
    evt.preventDefault();
    console.log(repoStatus, repoName);

    // POST /repositories
    const { data } = await githubInstance.post("/user/repos", {
      name: repoName,
      private: repoStatus,
      gitignore_template: "Node",
      license_template: "mit",
    });

    console.log(data);
    handleClick();
  };

  return (
    <>
      <Box
        sx={{
          border: "1px dashed grey",
          p: 2,
          marginTop: 2,
        }}
      >
        <Typography variant="h5">Nambah Repo Baru Yuk</Typography>
        <form onSubmit={formOnSubmitHandler}>
          <FormControl
            fullWidth
            sx={{
              marginTop: "1em",
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
            }}
          >
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              labelId="status-label"
              id="status"
              value={repoStatus}
              onChange={selectOnChangeHandler}
            >
              <MenuItem value={false}>Public</MenuItem>
              <MenuItem value={true}>Private</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Nama Repository"
              value={repoName}
              onChange={textFieldOnChangeHandler}
            />
            <Button variant="contained" size="large" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={"Repo baru terbuat dengan baik"}
        />
      </Box>
    </>
  );
};

export default FormAddRepository;
