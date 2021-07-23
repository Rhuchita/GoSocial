import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Comments({username, comments}) {
  
  return (
    <div className="post_comments">
      <Typography variant="body2" color="textSecondary" component="p">
      <h4>{username} : </h4>
      <span>{comments} </span>
      </Typography>
    </div>
  );
}