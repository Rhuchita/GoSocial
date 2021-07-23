import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Skeleton from "@material-ui/lab/Skeleton";
import { TakeComment } from "..";

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: "100%",
      margin: theme.spacing(2)
    },
    margin: {
      margin: theme.spacing(1),
    },
    media: {
      height: 350
    }
  }));

const preview=[{
    profileurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgCx47PF4sla_U4Cy5GvD0KFgKfoNlv_KNlg&usqp=CAU",
    title:"Dazzle",
    photourl:"https://i.pinimg.com/736x/e3/d7/15/e3d715e34b779c624f276c69749fe88f.jpg",
    caption:"New Photography😍",
},
{
    profileurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20rLJUk3ICwNHwnojtado6fPHTMbgjo0gcA&usqp=CAU",
    title:"Panda",
    photourl:"https://i.ytimg.com/vi/8ZMxLZqL73M/maxresdefault.jpg",
    caption:"Just a Post",
},
{
    profileurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPKX77HKn7KssnZ9cJwh0YH9k-r1jaJ4Jx5Q&usqp=CAU",
    title:"Luke",
    photourl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE5K6Vdl-GJI7KDHEmnF1cYB__G_Gv2QavDg&usqp=CAU",
    caption:"My Galaxy🌠",
},
{
    profileurl:"data:image/jpeg;base64,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",
    title:"SeasonQueen",
    photourl:"https://wallpaperaccess.com/full/187161.jpg",
    caption:"Just Imaginary things...🤩",
}
]
function Media(props) {
    const { loading = false } = props;
    const classes = useStyles();
  
    return (
        <div className="Preview_Post">
            {preview.map((image) => (
                <Card className={classes.card}>
                    
                    <CardHeader
                    avatar={
                        loading ? (
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                        ) : (
                        <Avatar
                            alt={image.title}
                            src={image.profileurl}
                        />
                        )
                    }
                    title={
                        loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                        ) : (
                        image.title
                        )
                    }
                    subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
                    />
                    {loading ? (
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    ) : (
                    <CardMedia
                        className={classes.media}
                        image={image.photourl}
                        title={image.title}
                    />
                    )}
            
                    <CardContent>
                    {loading ? (
                        <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" color="textSecondary" component="p">
                        {image.caption}
                        <TakeComment />
                        </Typography>
                        
                    )}
                    </CardContent>
                </Card>
            ))}
      </div>
    );
  }
  
  Media.propTypes = {
    loading: PropTypes.bool,
  };
  
  export default function PreviewPost() {
    return (
      <div>
        <Media />
      </div>
    );
  }
  