const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  archiveRoom,
  uploadRoomImage,
  deleteRoomImage,
  addBed,
  updateBed,
  deleteBed,
} = require("../controllers/room.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", createRoom);
router.get("/", getRooms);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);
router.patch("/:id/archive", archiveRoom);

/* images */
router.post("/upload", upload.array("images", 10), uploadRoomImage);
router.delete("/:id/images/:public_id", deleteRoomImage);

/* beds */
router.post("/:id/beds", addBed);
router.put("/:id/beds/:bedId", updateBed);
router.delete("/:id/beds/:bedId", deleteBed);

module.exports = router;