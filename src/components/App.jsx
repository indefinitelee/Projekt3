// import the libs we need
import React, { Component } from 'react';
// import './normalize.css';
import style from './App.css';
import Nav from './Nav/Nav.jsx';
import Content from './Content/Content.jsx';
import Youtube from './Content/Youtube/Youtube.jsx';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      videoID: '',
      eventData: {},
      bandName: '',
      eventDate: '',
      eventTime: '',
      eventName: '',
      eventVenue: '',
      eventCity: '',
      vidlikes: '',
      eventData: [],
      userLat: '0',
      userLong: '0',
      videos: [],
      name: '',
      signup: {
        username: '',
        password: ''
      },
      login: {
        loggedIn: true,
        username: '',
        password: ''
      }
    }
  }

  componentDidMount(){
    this.getUserLocation()
  }

  getUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      let crd = pos.coords;

      let long = crd.longitude
      let lat = crd.latitude
      console.log("Long is ", long)
      console.log("Lat is ", lat)

      this.setState({
        userLat: lat,
        userLong: long
      })
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success.bind(this), error, options);
  }

  handleUpdateSearch(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  getAllVids() {
     fetch(`/api/video/:video`)
     .then(r => r.json())
     .then((data) => {
       this.setState({
         video: data
       });
     })
     .catch(err => console.log(err));
   }


  handleSubmitSearch() {
    // e.preventDefault();
    console.log("this.state.searchTerm is ", this.state.searchTerm)
    fetch(`/api/video/${this.state.searchTerm}`)
    .then(r => r.json())
    .then((videos) => {
      console.log("videos: ", videos);
      console.log("videos drilldown: ", videos.items[0].id.videoId);
      this.setState({
        videoID: videos.items[0].id.videoId,
      })
    })
    .then(fetch(`/api/event/${this.state.searchTerm}/${this.state.userLat}/${this.state.userLong}`)
      .then(r => r.json())
      .then((events) => {
        console.log("events: ", events);
        console.log("events.page.totalElements ", events.page.totalElements)
        console.log("band name ", events._embedded.events[0]._embedded.attractions[0].name)
        let nameb = events._embedded.events[0]._embedded.attractions[0].name
        console.log("events.page.totalElements ", events.page.totalElements);
        let namee = events._embedded.events[0].name
        console.log("event name ", events._embedded.events[0].name)
        let venue = events._embedded.events[0]._embedded.venues[0].name
        console.log("Venue is ", events._embedded.events[0]._embedded.venues[0].name)
        let city = events._embedded.events[0]._embedded.venues[0].city.name
        console.log("City is ", events._embedded.events[0]._embedded.venues[0].city.name)
        let date = events._embedded.events[0].dates.start.localDate
        console.log("Date is ", events._embedded.events[0].dates.start.localDate)
        let time = events._embedded.events[0].dates.start.localTime
        console.log("Time is ", events._embedded.events[0].dates.start.localTime)
        this.setState({
          eventData: events._embedded.events[0],
          bandName: nameb,
          eventDate: date,
          eventName: namee,
          eventTime: time,
          eventVenue: venue,
          eventCity: city,
        })
      })
      .catch(error => console.log('Error: ', error),
      this.setState({
       bandName: 'No Events Available in Your Area',
      })
      )
    )
  }

  handleFormSubmit() {
    console.log("Video ID is", this.state.videoID);
    fetch(`/api/video/:video`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          name: this.state.videoID
        })
      })
      .then(this.setState({
        name: this.state.videoID
      }))
      .then(this.getAllVids())
      .catch(err => console.log("this", err));
    }

  handleDeletion(id) {
    fetch(`/api/apiRoute${id}`, {
      method: 'delete',
    })
    .then(() => {
      const videoId = this.state.videoId.filter((vid) => {
        return vid.id !== id;
      });
      this.setState({ videoId: videoId })
    })
  }

  updateFormSignUpUsername(e) {
     console.log(e.target.value);
     this.setState({
       signup: {
         username: e.target.value,
         password: this.state.signup.password
       }
     });
   }

   updateFormSignUpPassword(e) {
     console.log(e.target.value);
     this.setState({
       signup: {
         username: this.state.signup.username,
         password: e.target.value
       }
     });
   }

   updateFormLogInUsername(e) {
     this.setState({
       login: {
         username: e.target.value,
         password: this.state.login.password
       }
     });
   }

   updateFormLogInPassword(e) {
     this.setState({
       login: {
         username: this.state.login.username,
         password: e.target.value
       }
     });
   }

   handleSignUp(e) {
     e.preventDefault();
     fetch('/api/users', {
       headers: {
         'Content-Type': 'application/json'
       },
       method: 'POST',
       body: JSON.stringify({
         username: this.state.signup.username,
         password: this.state.signup.password
       })
     })
     .then(this.setState({
       signup: {
         username: '',
         password: ''
       }
     }))
     .then(this.alertInfo('You signed up!'))
     .catch(err => console.log(err));
   }

   handleLogIn() {
     fetch('/auth', {
       headers: {
         'Content-Type': 'application/json'
       },
       method: 'POST',
       body: JSON.stringify({
         username: this.state.login.username,
         password: this.state.login.password
       })
     })
     .then(this.setState({
       login: {
         username: '',
         password: ''
       }
     }))
     .then(this.onSuccessfulLogIn)
     .catch(err => console.log(err));
   }

   onSuccessfulLogIn(a,b) {
     console.log(a,b);
   }

   alertInfo(msg) {
     alert(msg);
   }

  render(){
   if (this.state.login.loggedIn === false){
    return (
      <div id="app-container">
        <header>

        </header>

        <Register
          signUpUsername={this.state.signup.username}
          signUpPassword={this.state.signup.password}
          updateFormUsername={event => this.updateFormSignUpUsername(event)}
          updateFormPassword={event => this.updateFormSignUpPassword(event)}
          handleUser= {(e) => this.handleSignUp(e)}
        />
        <Login
          className={this.state.login.loggedIn ? 'hidden' : ''}
          logInUsername={this.state.login.username}
          logInPassword={this.state.login.password}
          updateFormUsername={event => this.updateFormLogInUsername(event)}
          updateFormPassword={event => this.updateFormLogInPassword(event)}
          handleUser={() => this.handleLogIn()}
        />
       </div>
      );

   } else {
      return
       <div id="app-container">
        <header>
          <h1>PR<span>ʞ</span>⅄EKT.Ɛ</h1>
          <ul>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </header>
        <Nav
          searchTerm={this.state.searchTerm}
          videoId={this.state.videoId}
          name={this.state.videoID}
          getAllVids={this.getAllVids.bind(this)}
          handleUpdateSearch={event => this.handleUpdateSearch(event)}
          handleSubmitSearch={event => this.handleSubmitSearch(event)}
          handleFormSubmit={() => this.handleFormSubmit()}
          handleDeletion={this.handleDeletion.bind(this)}
        />
        <Content
          videoID={this.state.videoID}
          eventData={this.state.eventData}
          bandName={this.state.bandName}
          eventDate={this.state.eventDate}
          eventName={this.state.eventName}
          eventTime={this.state.eventTime}
          eventVenue={this.state.eventVenue}
          eventCity={this.state.eventCity}
        />
      }
      </div>
    );
  }
}
export default App;
