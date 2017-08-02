

var posts = [
    {
        header: "This is a Title",
        content: "This is Quality Content Yo"
    }
] // comment out in production
//var posts = [] Initialize Firebase
var config = {
    apiKey: "AIzaSyCM-tMbIGk-YHxZQhYLqWbrcF8ENV5gjfQ",
    authDomain: "sdc-events.firebaseapp.com",
    databaseURL: "https://sdc-events.firebaseio.com",
    projectId: "sdc-events",
    storageBucket: "sdc-events.appspot.com",
    messagingSenderId: "385950340348"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    //Materialize.toast("You are being logged out", 1000, '', function(){window.location.href = "/"})
  }
});
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            events: [
                // {
                //     location: "13330 Salmon River Rd, San Diego, CA 92129",
                //     type: "Workshop",
                //     date: "7/27/17",
                //     people: [
                //         {
                //             name: "Not Filled",
                //             role: "Lead",
                //             profilePicture: "https://thumb1.shutterstock.com/display_pic_with_logo/4342048/465585254/stock-vector-facebook-profile-icon-vector-social-media-illustration-eps-fb-person-flat-ui-sign-user-interface-465585254.jpg"
                //         }
                //     ]
                // }
            ],
            posts: [
                {
                    header: "This is a Title",
                    content: "This is Quality Content Yo"
                }
            ]
        };
    }

    componentDidMount() {
        var that = this;
        firebase.database().ref("events").on("child_added", (child) => {

            var p = that.state.events;
            console.log(child.val());
            p.push(child.val());
            that.setState({posts: p, username: firebase.auth().currentUser.displayName});
            that.forceUpdate()

        }, 
        (error) => {
                console.log("error");
        });
            
        // firebase.database().ref("events").on("child_changed", (child) => {
        //     var p = that.state.events;

            
        //     p.push(child.val());
        //     that.setState({posts: p, username: firebase.auth().currentUser.displayName});
        //     that.forceUpdate()

        // }, 
        // (error) => {
        //         console.log("error");
        // });
        $(".button-collapse").sideNav();

    }

    render() {
        return (
            <div>
  
              <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo left"> SDC Events</a>
                              <a href="#" data-activates="mobile-demo" className="button-collapse right"><i className="material-icons">menu</i></a>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">Logged in as {this.state.username}</a></li>
                            <li><a href="#" onClick={() => {
                                firebase.auth().signOut()
                                Materialize.toast("You are being signed out", 2000, '', () => {window.location.href = "/"})
                                }}>Sign Out</a></li>
                        </ul>
                        <ul class="side-nav right" id="mobile-demo">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">Logged in as {this.state.username}</a></li>
                            <li><a href="#" onClick={() => {
                                firebase.auth().signOut()
                                Materialize.toast("You are being signed out", 2000, '', () => {window.location.href = "/"})
                                }}>Sign Out</a></li>
                        </ul>
                    </div>
                </nav>
                <div className = "container"> 
                        
                    <h1 className="center">Sign Up</h1>
                
                    <h4>Upcoming Events</h4>
                    
                    
                    {
                        this.state.events.map( (e)=>{
                            return <Event parent={this} event = {e} />
                        })
                    }
                </div>
            </div>
        )
    }

}

class Event extends React.Component {
    constructor(props) {
        super(props)
        this.downloadCalendarFile = this.downloadCalendarFile.bind(this)
        //this.addPerson = this.addPerson.bind(this)
    }

    addPerson(p) {
        if (p.name.toLowerCase() != ("").toLowerCase()) {
            Materialize.toast("This position has already been taken", 4000)
            return
        }
        firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/events/" + this.props.event.uuid).once('value').then((snapshot) => {
            var events = snapshot.val()
            var okay = false
            //debugger
            console.log(snapshot.val())
            if (events && typeof events != 'undefined'){
                Materialize.toast("You already have a job!", 4000)
            }
            else {
                okay = true
            }
            console.log(okay)
            if (okay == true) {
                // take the job
                 firebase.database().ref("events/" + this.props.event.uuid + "/people/" + p.uuid).set({
                    name: firebase.auth().currentUser.displayName,
                    role: p.role,
                    uuid: p.uuid,
                    personId: firebase.auth().currentUser.uid,
                    profilePicture: firebase.auth().currentUser.photoURL
                })
                this.props.parent.forceUpdate()
                Materialize.toast(("Congrats! You now have the role " + p.role + " for " + this.props.event.type), 2000, '', function() {location.reload()})

                this.props.parent.setState({render: true})
                firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/events/" + this.props.event.uuid).set({role: p.role, username: firebase.auth().currentUser.email})
                //location.reload()
            }
        })
        

       
    }

    downloadCalendarFile() {
        console.log('preparing ics')
        var icsFile = `
        BEGIN:VCALENDAR
        VERSION:2.0
        CALSCALE:GREGORIAN
        BEGIN:VEVENT
        SUMMARY:` + this.props.event.type + `
        DTSTART;TZID=America/New_York:20130802T103400
        DTEND;TZID=America/New_York:20130802T110400
        LOCATION:` + this.props.event.location +  `
        DESCRIPTION:
        STATUS:CONFIRMED
        SEQUENCE:3
        BEGIN:VALARM
        TRIGGER:-PT10M
        DESCRIPTION:Pickup Reminder
        ACTION:DISPLAY
        END:VALARM
        END:VEVENT
        BEGIN:VEVENT
        SUMMARY:Access-A-Ride Pickup
        DTSTART;TZID=America/New_York:20130802T200000
        DTEND;TZID=America/New_York:20130802T203000
        LOCATION:900 Jay St.\, Brooklyn
        DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\, Brooklyn
        STATUS:CONFIRMED
        SEQUENCE:3
        BEGIN:VALARM
        TRIGGER:-PT10M
        DESCRIPTION:Pickup Reminder
        ACTION:DISPLAY
        END:VALARM
        END:VEVENT
        END:VCALENDAR
        `
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([icsFile], {type: 'text/ics'}));
        a.download = 'test.csv';

        // Append anchor to body.
        document.body.appendChild(a)
        //a.click();

        // Remove anchor from body
        document.body.removeChild(a)
    }

    render() {
        //console.log('this far')
        console.log(this.props.event)
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{this.props.event.type} on {this.props.event.date}</span>
                            <p>Location: {this.props.event.location}</p>

                            {
                                this.props.event.people.map((p) => {
                                    //console.log(this)
                                    return (
                                        <a href="#!" person={p} onClick={
                                            () => { 
                                                this.addPerson(p)
                                            }
                                        }>
                                        <div className="chip">
                                            <img src={(p.profilePicture == "" ? "http://www.freeiconspng.com/uploads/profile-icon-9.png" : p.profilePicture)} />
                                            {(p.name == "") ? "Click to Take" : p.name } - {p.role}
                                        </div>
                                        </a>
                                    )

                                })
                            }
                            
                                
                        
                                        
                        </div>
                            <div className="card-action">
                            <a href="#" onClick={this.downloadCalendarFile}>Add To Calendar</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
// class Post extends React.Component {
//         render() {
//             return ( <
//                 div className = 'post' > < div className = 'container' >
//                 <
//                 h5 > {
//                     this.props.data.header
//                 } < /h5 > < p > {
//     this.props.data.content
// } < /p></div > < /div>)
//             }
//         }

// //         class TextForm extends React.Component {
//             constructor(props) {
//                 super(props);
//                 this.state = {
//                     value: ''
//                 };

//                 this.handleContentChange = this.handleContentChange.bind(this);
//                 this.handleHeaderChange = this.handleHeaderChange.bind(this);
//                 this.handleSubmit = this.handleSubmit.bind(this);
//             }

//             handleContentChange(event) {
//                 this.setState({
//                     content: event.target.value
//                 });
//             }

//             handleHeaderChange(event) {
//                 this.setState({
//                     header: event.target.value
//                 });
//             }

//             handleSubmit(event) {
//                 posts.push({
//                     header: this.state.header,
//                     content: this.state.content
//                 })
//                 this.props.handler.forceUpdate()

//                 //firebase
//                 pushToServer(this.state.header, this.state.content)

//                 event.preventDefault();
//             }

//             render() {
//                 return ( <
//                     form onSubmit = {
//                         this.handleSubmit
//                     } >

//                     <
//                     input placeholder = "Post Header"
//                     id = "first_name"
//                     type = "text"
//                     value = {
//                         this.state.header
//                     }
//                     onChange = {
//                         this.handleHeaderChange
//                     }
//                     className = "validate" / > < br / > < label > < textarea className = "materialize-textarea"
// type = "text"
// value = {
//     this.state.content
// }
// onChange = {
//     this.handleContentChange
// }
// placeholder = "Post Content" / > < /label><br / > < input className = "waves-effect waves-light btn"
// type = "submit"
// value = "Submit" / > < /form>
//                 );
//             }
//         }


         ReactDOM.render( < App / >,
document.getElementById('app'))

function pullFromServer() {
    var db = firebase.database();
    var children = []; // get all of the posts from firebase and return them
    db
        .ref("posts")
        .once("child_added")
        .then((child) => {
            children.push(child);
        })
        .catch((error) => {
            console.log(error.message);
        });
    return children;
}

function pushToServer(h, c) {
    var post = {
        header: h,
        content: c
    }
    var db = firebase.database();

    db
        .ref("posts")
        .push()
        .set({content: post.content, header: post.header});
}
$(".button-collapse").sideNav();
