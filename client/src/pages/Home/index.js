import React, { useEffect, useState } from 'react';

import * as api from '../../api';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import OnlineRecently from '../../components/OnlineRecently';
import Post from '../../components/Post';
import Grid from '../../components/ui/Grid';
import { useSocket } from '../../contexts/socketContext';

function Home() {
  const [posts, setPosts] = useState();
  const socket = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await api.getPosts();
      if (error) return console.log(error.message);
      setPosts(data.posts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('change posts', (posts) => {
      setPosts(posts);
    });
    return socket.off('change posts');
  }, [socket]);

  return (
    <>
      <Header />
      <Grid.Container>
        <Grid.Item column="1-3">
          <Navigation />
        </Grid.Item>

        <Grid.Item column="3-10">
          <main>
            <ul>
              {posts &&
                posts.map((post) => <Post key={post._id} post={post} />)}
            </ul>
          </main>
        </Grid.Item>

        <Grid.Item column="10-13">
          <OnlineRecently />
        </Grid.Item>
      </Grid.Container>
    </>
  );
}

export default Home;
