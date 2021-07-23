import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
// import CircularProgress from "@material-ui/core/CircularProgress";
//import AuthDialogs from "../../authModal";
import "./styles.css";
import { SignInBtn } from "../../components";
import { storage, db } from "../../firebase";
import makeid from "../../helper/functions";
import firebase from "firebase";
import { UserContext } from "../../contexts/user";

//import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: "30%",
    alignItems: "left",
    justifyContent: "right",
    flexGrow: 1
  },
  pos: {
    marginBottom: 12
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function CreatePost() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      var imageLink = makeid(10);
      const uploadTask = storage.ref(`images/${imageLink}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                postImageUrl: url,
                userName: user.displayName.toLowerCase(),
                userProfileUrl:
                  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4"
              });
            });

          setProgress(0);
          setCaption("");
          setImage(null);
          var preview1 = document.getElementById("image-1-preview");
          preview1.style.display = "none";
        }
      );
    }
  };

  // const removeImage = () => {
  //   var preview1 = document.getElementById("image-1-preview");
  //   preview1.style.display = "none";
  // };

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div className="createPost">
      {user ? (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Create Post
              <Icon
                className="fa fa-plus-circle"
                fontSize="small"
                padding="5px"
              />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Text/Photos
            </Typography>
            <TextField
              className="textArea"
              id="standard-full-width"
              label=""
              style={{ margin: 4 }}
              placeholder="Enter post/caption here..."
              margin="normal"
              border="none"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={this.caption}
              onchange={(e) => this.setCaption(e.target.value)}
            />
            <img className="imagePreview" id="image-preview" alt="" />
          </CardContent>
          <CardActions>
            <Button size="small" className="select_Btn">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddAPhotoIcon />
                </IconButton>
              </label>
            </Button>
            <Button
              className="uploadBtn"
              onclick={handleUpload}
              style={{
                color: caption ? "#000" : "lightgrey",
                border: "none"
              }}
            >
              {`Upload ${progress !== 0 ? progress : ""}`}
            </Button>
          </CardActions>
        </Card>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
}
