import React from 'react';

class SignUpUserTypes extends React.Component {
  state = {
    email: '',
    password: '',
    repassword: ''
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    this.props.signUpNewUserWithEmailAndPassword(
      e, 
      this.state.email, 
    );
  }

  render() {
    // console.log('%cstate', 'color: blue', this.state);
    return (
        <section> 
          <h2>Are You a...</h2>
          <button>Job Seeker</button>
          <button>Employer</button>
        </section>
    );
  }
}

export default SignUpUserTypes;