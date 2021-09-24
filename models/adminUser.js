const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})


const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

module.exports = AdminUser