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
} from "@mui/material";

const FormAddRepository = () => {
  const [repoStatus, setRepoStatus] = useState("false"); // set awalnya jadi public
  const [repoName, setRepoName] = useState("");

  const textFieldOnChangeHandler = (evt) => {
    setRepoName(evt.target.value);
  };

  const selectOnChangeHandler = (evt) => {
    setRepoStatus(evt.target.value);
  };

  const formOnSubmitHandler = (evt) => {
    evt.preventDefault();
    console.log(repoStatus, repoName);
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
              <MenuItem value={"false"}>Public</MenuItem>
              <MenuItem value={"true"}>Private</MenuItem>
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
      </Box>
    </>
  );
};

export default FormAddRepository;
