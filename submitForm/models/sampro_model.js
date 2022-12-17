const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:
        {
            type     : String,
            required : true
        },
        number:
        {
            type      : Number,
            required  : true,
            validate: {
                validator: function (n) {
                  return /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(n);
                },
                message: "Please enter a valid number",
              },

        },
        email: {
            type: String,
            required: true,
            validate: {
              validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
              },
              message: "Please enter a valid email",
            },
          },
        
        image:
        {
            type      : String,
            required  : false
        }
    },
    {
      timestamps:true
    })


module.exports = mongoose.model('User', userSchema, 'users');
    