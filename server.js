const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db="mongodb+srv://pratiknalawade1000:pratik@cluster0.mselfmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const todoRoutes = require('./routes/todo');
app.use('/api', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
