const Room = require("../models/Room");
const cloudinary = require("../utils/cloudinary");

/* ================= CREATE ================= */
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(201).json({
      success: true,
      room,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isArchived: false }).sort("-createdAt");

    res.json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ONE ================= */
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ROOM ================= */
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room)
      return res.status(404).json({ success: false, message: "Not found" });

    Object.assign(room, req.body);

    await room.save();

    res.json({
      success: true,
      message: "Updated",
      room,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= ARCHIVE ================= */
exports.archiveRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true }
    );

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= IMAGE UPLOAD ================= */
exports.uploadRoomImage = async (req, res) => {
  try {
    if (!req.files?.length)
      return res.json({ success: true, urls: [] });

    const uploaded = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);

      uploaded.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    res.json({ success: true, urls: uploaded });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE IMAGE ================= */
exports.deleteRoomImage = async (req, res) => {
  try {
    const { id, public_id } = req.params;

    const room = await Room.findById(id);
    if (!room)
      return res.status(404).json({ message: "Room not found" });

    await cloudinary.uploader.destroy(public_id);

    room.images = room.images.filter(
      (img) => img.public_id !== public_id
    );

    await room.save();

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= BED ADD ================= */
exports.addBed = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    room.beds.push(req.body);

    await room.save();

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= BED UPDATE ================= */
exports.updateBed = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    const bed = room.beds.id(req.params.bedId);

    Object.assign(bed, req.body);

    await room.save();

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= BED DELETE ================= */
exports.deleteBed = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    room.beds.pull(req.params.bedId);

    await room.save();

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};