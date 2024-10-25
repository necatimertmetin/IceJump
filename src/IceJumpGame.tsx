import React from "react";
import { Grid, Paper } from "@mui/material";

export const IceJumpGame = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Grid item xs={1} key={index}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              textAlign: "center",
              height: "100px", // Adjust height as needed
              backgroundColor: "#e0f7fa", // Example background color
            }}
          >
            Paper {index + 1}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
