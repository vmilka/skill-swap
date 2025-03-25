const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Skill name cannot exceed 50 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters']
    },
    years_experience: {
      type: Number,
      required: true,
      min: [0, 'Experience cannot be negative']
    },
    certifications: [
      {
        type: String,
        trim: true,
        maxlength: [100, 'Certification name cannot exceed 100 characters']
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // include virtuals when object is converted to JSON
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        //delete ret.id;

        delete ret.user.active;
        delete ret.user.createdAt;
        delete ret.user.updatedAt;
        delete ret.user.id;


 

        return ret;
      },
    },
  }
);

skillSchema.virtual("users", {
  ref: "User",
  localField: "id",
  foreignField: "user",
  justOne: true,
});
 
const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
