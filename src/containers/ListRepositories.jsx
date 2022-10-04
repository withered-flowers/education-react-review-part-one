import React, { useEffect } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import githubInstance from "../apis/github";
import { useGithub } from "../contexts/GithubProvider";

const ListRepositories = () => {
  const { repositories, setRepositories } = useGithub();

  useEffect(() => {
    const fetchGithubRepo = async () => {
      const { data } = await githubInstance.get("/user/repos");
      setRepositories(data);
    };

    fetchGithubRepo();

    // Karena di sini kita tidak ingin memasukkan deps list apapun
    // padahal di sini kita ada mendeclare penggunaan setRepositories dan repositories
    // sehingga harus menggunakan eslint comment untuk disable exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ border: "1px dashed grey", p: 2, marginTop: 2 }}>
        <Typography variant="h5">Repositoriku Apa Saja?</Typography>

        <Table
          sx={{
            minWidth: 768,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Creation Time</TableCell>
              <TableCell align="center">Go To Repo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Ini nanti bisa dijadikan Component bila diperlukan */}
            {repositories.map((repository) => (
              <TableRow key={repository.id}>
                <TableCell align="center">{repository.id}</TableCell>
                <TableCell align="center">{repository.name}</TableCell>
                <TableCell align="center">
                  {repository.private ? "Private" : "Public"}
                </TableCell>
                <TableCell align="center">{repository.created_at}</TableCell>
                <TableCell align="center">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={repository.html_url}
                  >
                    Click Me
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default ListRepositories;
