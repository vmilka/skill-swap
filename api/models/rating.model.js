const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    ratedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Usuario que recibe la calificación
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Usuario que deja la calificación
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Calificación entre 1 y 5
    },
    comment: {
      type: String,
      trim: true, // Comentario opcional
    },
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

// Evita que un usuario califique al mismo usuario más de una vez
ratingSchema.index({ ratedUser: 1, reviewer: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
