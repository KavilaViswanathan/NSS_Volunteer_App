const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const adminrouter = require('./router/admin_router');
const userrouter = require('./router/user_router');

app.use(cors());
app.use(express.json());

mongoose  .connect(process.env.DB || "mongodb://localhost:27017/NSS_Volunteer")
  .then((_) => {
    console.log("db connected sucessfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

  
app.use('/admin', adminrouter);
app.use('/user', userrouter);

const port = process.env.PORT || 27000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
