import React, { useEffect, useState } from 'react';

import * as api from '../../api';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import OnlineRecently from '../../components/OnlineRecently';
import Post from '../../components/Post';
import Grid from '../../components/ui/Grid';
import style from './Home.module.scss';

function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await api.getPosts();
      if (error) return console.log(error.message);
      setPosts(data.posts);
    };
    fetchData();
  }, []);

  return (
    <div className={style.wrapper}>
      <Header />
      <Grid.Container>
        <Grid.Item column="1-3">
          <Navigation />
        </Grid.Item>

        <Grid.Item column="3-10">
          <main>
            {posts && (
              <ul>
                {posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </ul>
            )}
          </main>
        </Grid.Item>

        <Grid.Item column="10-13">
          <OnlineRecently />
        </Grid.Item>
      </Grid.Container>
    </div>
  );
}

export default Home;
