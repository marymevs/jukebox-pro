import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistsByTrackId } from "#db/queries/playlists";

router.use(requireUser);

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.get("/:id/playlists", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.sendStatus(404);
  const playlists = await getPlaylistsByTrackId(req.params.id, req.user.id);
  res.send(playlists);
});
