import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Clarifai, { FACE_DETECT_MODEL } from "clarifai";
import FaceRecognition from "./components/FaceRecognition";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import ImageLinkForm from "./components/ImageLinkForm";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "52bdfb50404f497a89ffddebd79aee3f",
});

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
  };

  // componentDidMount() {
  //   fetch("http://localhost:3001")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onSubmitDetect = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
  .predict(
    {
      id: "a403429f2ddf4b49b307e318f00e528b",
      version: "34ce21a40cc24b6b96ffee54aabff139",
    },
    this.state.input
  )
  .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch((err) => {
    console.log("Clarifai Error:", err);
  });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmitDetect={this.onSubmitDetect}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
