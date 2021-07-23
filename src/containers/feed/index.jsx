import React, { useState, useEffect } from "react";
import { Posts } from "..";
import { db } from "../../firebase";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="feed">
      {/* <Posts
        profileUrl="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
        username="seasonQueen"
        caption="Hey This is first Post"
        id="tdAcEstby01uDh2TgeCG"
        photoUrl="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
      /> */}
      {posts.map(({ id, post }) => {
        return (
          <Posts
            key={id}
            id={id}
            profileUrl={post.profileUrl}
            username={post.username}
            photoUrl={post.photoUrl}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
    </div>
  );
}
