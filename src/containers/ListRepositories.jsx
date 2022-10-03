import React from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ListRepositories = () => {
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
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">Dummy</TableCell>
              <TableCell align="center">Public</TableCell>
              <TableCell align="center" l>
                2000-01-01
              </TableCell>
              <TableCell align="center">Click Me</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default ListRepositories;
