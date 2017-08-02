var header = <h1>Welcome to React</h1>
/**
     * Handles the sign up button press.
     */


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'signin'
    }
  }
  render() {
    return (
      <body>
        <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">SDC Events</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/">Home</a></li>
              <li><a href="main">Events</a></li>
            </ul>
          </div>
        </nav>
        </header>
        
        <main>
           <div className="container">
              <div className = "section">
                
                {
               (this.state.status == "signup") ? "Already have an account?" : "Don't have an account?"
             } <a href="#!" onClick={() => {
                  let newState = (this.state.status == "signup") ? "signin" : "signup"  

                  this.setState({status: newState})
                }
                    }>{
               (this.state.status == "signup") ? "Sign In" : "Make one now"
             }</a> 
              </div>
             {
               (this.state.status == "signup") ? <SignUp/> : <SignIn/>
             }
          </div>
        </main>
      </body>
    )
  }
}
class SignIn extends React.Component {

  logIn() {

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if ($("#password").hasClass('valid') && $("#email").hasClass('valid')) {
      firebase.login(email, password)
    }
    else {
      Materialize.toast("One or more fields is incorrect", 4000)
    }
  }
  forgotPassword() {
    let email = document.getElementById("email").value

    if ($("#email").hasClass('valid')) {
      firebase.forgotPassword(email)
    }
    else {
      Materialize.toast("Invalid Email", 4000)
    }
  }
  render() {
    return (
      
      <div className="section">
               <h2 className="header">Sign In</h2>
               <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input placeholder="username@sdcoding.com" id="email" type="email" className="validate"/>
                    <label for="email">Email</label>
                  </div>

                  <div className="input-field col s6">
                    <input id="password" type="password" className="validate"/>
                    <label for="password">Password</label>
                  </div>
                </div>
                

              </form>
                 <div className="row">

                 <a className="waves-effect waves-light btn left" onClick={() => {this.logIn()}}><i className="material-icons left" href="#!">done</i>Log In</a>


                 <a className="waves-effect waves-light btn right" onClick={() => {this.forgotPassword()}}>Forgot Password</a>

                 </div>
            </div>
             </div>
    )
  }
}
class SignUp extends React.Component {
  makeAccount() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let url = document.getElementById("photo").value
    if ($("#name").hasClass('valid') && $("#email").hasClass('valid') && $("#photo").hasClass('valid') && $("#password").hasClass('valid')) {
      firebase.createUser(name, email, password, url)
    }
    else {
      Materialize.toast("One or more fields is incorrect", 4000)
    }
  }
  render() {
    return (
      
      <div className="section">
               <h2 className="header">Make Account</h2>
               <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="No Symbols, Text Only" id="name" type="text" pattern="[a-zA-Z\s]*$" className="validate"/>
                    <label for="name">Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="username@sdcoding.com" id="email" type="email" className="validate"/>
                    <label for="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="photo" type="url" placeholder= "Paste the Image Url Here (Keep it Professional)" className="validate"/>
                    <label for="photo">Profile Picture</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="password" pattern="(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$" placeholder= "Any complex 8 character combination" className="validate"/>
                    <label for="password">Password</label>
                    <p>Password must contain one upper case letter, one lower case letter, one symbol, one number, and must be 8 characters long</p>
                  </div>
                </div>
                

              </form>
                 <a className="waves-effect waves-light btn" onClick={() => {this.makeAccount()}}><i className="material-icons left" href="#!">done</i>Create Account</a>
            </div>
             </div>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById('app'))