import React from "react";
import Grid from "@material-ui/core/Grid";
import { CreatePost, NavBar, Feed, Headline, Collection } from "../../containers";
import { BackToTop } from "../../components";
import "./style.css";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <div className="content_main">
        <Grid container spacing={3}>
          <Grid item xs>
            <Collection />
          </Grid>
          <Grid item xs={6}>
            <CreatePost />
            <Feed />
          </Grid>
          <Grid item xs={3}>
            <Headline />
          </Grid>
        </Grid>
        <BackToTop />
      </div>
    </div>
  );
}
