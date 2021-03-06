import React from 'react';
import Heart from '../../images/favheart.png';
import Avatar from '../../images/gear.png';
import Logout from '../../images/logout1.png';
import Plus from '../../images/plussign.png';
import Question from '../../images/question.png';

import { Nav, Icons, InButton, DropMenu } from './NavBarStyles';

import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }
  handleSignIn = () => {
    this.props.history.push('/signin');
  };

  favorite = () => {
    const { uid } = this.props.user;
    this.props.history.push(`/favorites/${uid}`);
  };

  profilePop = () => {
    this.props.history.push(`/settings`);
  };

  addJobs = () => {
    this.props.history.push('/settings/job-listings');
  };

  infoToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  render() {
    // console.log(this.props.user);
    return (
      <Nav className="nav">
        {this.props.user ? (
          <Icons>
            {this.props.user.role === 'seeker' ? (
              <div className="heart" onClick={this.favorite}>
                <img alt="Favorites Icon" src={Heart} title="Favorites" />
              </div>
            ) : (
              <div className="heart" onClick={this.addJobs}>
                <img alt="Favorites Icon" src={Plus} title="Favorites" />
              </div>
            )}
            <div className="avatar">
              <img
                alt="Avatar Icon"
                src={Avatar}
                onClick={this.profilePop}
                title="User Settings"
              />
            </div>
            <div className="signout">
              <img
                alt="Logout"
                src={Logout}
                onClick={this.props.signOut}
                title="Logout"
              />
            </div>
            <div className="question" onClick={this.infoToggle}>
              <img
                className="question-icon"
                src={Question}
                alt="Info"
                title="More Info"
                onClick={this.infoToggle}
              />
              {this.state.showMenu ? (
                <DropMenu className="drop-menu">
                  <Link to="/tutorial">How it Works</Link>
                </DropMenu>
              ) : null}
            </div>
          </Icons>
        ) : (
          <div>
            <InButton className="sign-in" onClick={this.handleSignIn}>
              Sign In
            </InButton>
          </div>
        )}
      </Nav>
    );
  }
}

export default NavBar;
