const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al usuario que envía el mensaje
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al usuario que recibe el mensaje
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    seen: {
      type: Boolean,
      default: false, // Indica si el receptor ha leído el mensaje
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // include virtuals when object is converted to JSON
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.createdAt;
        delete ret.sender.active;
        // delete ret.sender.createdAt;
        delete ret.sender.updatedAt;
        delete ret.sender.name;
        delete ret.sender.email;

        // delete ret.receiver.active;
        // delete ret.receiver.createdAt;
        // delete ret.receiver.updatedAt;
        // delete ret.receiver.name;
        // delete ret.receiver.email;

        // ret.receiver = doc.receiver.id
        
        console.log(doc)

        return ret;
      },
    },
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;