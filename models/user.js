const mongoose = require("mongoose");

const UserloginSchema = mongoose.Schema(
    {

        name: {
            type:String,
            required:[true,"Name is important"],
        },
        email: {
            type:String,
            required:[true,"Email ID is important"],

        },
        mobile: {
            type:String,
            required:[true,"phone no  is important"],

        },
        password: {
            type:String,
            required:[true,"password is important"],

        },
        gender: {
            type:String,
            required:true,

        },

},
{
    timestamps: true,
},
)

module.exports = mongoose.model("User", UserloginSchema);