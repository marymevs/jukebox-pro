import db from "#db/client";

import { faker } from "@faker-js/faker";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // create 2 users
  const user1 = await createUser(
    faker.internet.username(),
    faker.internet.password(),
  );
  const user2 = await createUser(
    faker.internet.username(),
    faker.internet.password(),
  );

  for (let i = 1; i <= 20; i++) {
    // chose user to own playlist
    const user_id = Math.floor(Math.random() * 2) + 1;
    await createPlaylist(
      "Playlist " + i,
      "lorem ipsum playlist description",
      user_id,
    );
    await createTrack("Track " + i, i * 50000);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
}
