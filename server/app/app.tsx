import express from "express";
// const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("app listening on port 3000");
  });
