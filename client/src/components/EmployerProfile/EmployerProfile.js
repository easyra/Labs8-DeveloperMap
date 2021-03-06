import React from 'react';
import firebase from '../../firebase/firebase';
import { ModalContainer } from '../../styles/ModalGlobalStyle';
import profile from '../../images/avatar-icon.jpg';
import {
  Info,
  Styling,
  ProfilePic,
  InfoContainer,
  EmployerModalMain,
} from './EmployerStyles';
import axios from 'axios';
import EmployerPostings from './EmployerPostings';
import FavHeart from '../../images/favorites-icon.png';
import Heart from '../../images/hollow-heart.png';
import LoadingModal from '../Loading/LoadingModal';

class EmployerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companyInfo: {},
    };
  }

  favToggle = e => {
    e.preventDefault();

    const user = this.props.user;
    if (!user) {
      this.props.history.push('/signin');
    } else if (e.target.src === FavHeart) {
      //Removes Favorited Post from current User if confirms
      const favoritedList = [
        ...this.state.favoritedList.filter(jobId => jobId !== e.target.id),
      ];
      this.setState({ favoritedList });
      e.target.src = Heart;
    } else {
      //Adds Favorited Post to current User's list if confirms
      const favoritedList = [...this.state.favoritedList];
      favoritedList.push(e.target.id);
      this.setState({ favoritedList });
      e.target.src = FavHeart;
    }
  };

  componentDidMount() {
    const employerId = this.props.match.params.employerId;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        if (this.state.posts) {
          axios
            .get(
              `https://intense-stream-29923.herokuapp.com/api/database/favorites/keys/${uid}`
            )
            .then(response => {
              const { favoritedList } = response.data;
              const initialFavoritedList = favoritedList;
              this.setState({
                favoritedList,
                initialFavoritedList,
                loading: false,
              });
            });
        } else {
          axios
            .get(
              `https://intense-stream-29923.herokuapp.com/api/database/companies/allCompanyDataAndFavKeys/${employerId}/${uid}`
            )
            .then(response => {
              const { posts, companyInfo, favoritedList } = response.data;
              const initialFavoritedList = favoritedList;
              this.setState({
                posts,
                companyInfo,
                favoritedList,
                initialFavoritedList,
                loading: false,
              });
            });
        }
      } else {
        axios
          .get(
            `https://intense-stream-29923.herokuapp.com/api/database/companies/allCompanyData/${employerId}`
          )
          .then(response => {
            const { posts, companyInfo } = response.data;
            this.setState({
              posts,
              companyInfo,
              favoritedList: [],
              initialFavoritedList: [],
              loading: false,
            });
          });
      }
    });
  }

  componentWillUnmount() {
    const { favoritedList, initialFavoritedList } = this.state;
    firebase.auth().onAuthStateChanged(user => {
      if (favoritedList !== initialFavoritedList) {
        if (user) {
          const { uid } = user;
          axios
            .put(
              'https://intense-stream-29923.herokuapp.com/api/database/favorites',
              {
                favoritedList,
                uid,
              }
            )
            .then();
        }
      } else {
        console.log('no change');
      }
    });
  }

  render() {
    const { posts, favoritedList, initialFavoritedList } = this.state;
    const {
      profilePicture,
      companyName,
      location,
      companyWebsite,
      phoneNumber,
      email,
    } = this.state.companyInfo;
    return (
      <>
        <ModalContainer data-type="modal-container">
          <EmployerModalMain className="modal">
            {this.state.loading ? (
              <LoadingModal />
            ) : (
              <Styling>
                <Info>
                  {profilePicture ? (
                    <ProfilePic src={profilePicture} alt="profile" />
                  ) : (
                    <ProfilePic src={profile} alt="default" />
                  )}
                  <h2 className="com-name">{companyName}</h2>
                  <InfoContainer>
                    <h3>Location:</h3>
                    <h4>{location.city}</h4>
                    <h3>Website:</h3>
                    <h4>{companyWebsite}</h4>
                    <h3>Phone</h3>
                    <h4>{phoneNumber}</h4>
                    <h3>Email:</h3>
                    <h4>{email}</h4>
                  </InfoContainer>
                </Info>
                <EmployerPostings
                  {...this.props}
                  favToggle={this.favToggle}
                  posts={posts}
                  favoritedList={favoritedList}
                  initialFavoritedList={initialFavoritedList}
                />
              </Styling>
            )}
          </EmployerModalMain>
        </ModalContainer>
      </>
    );
  }
}

export default EmployerProfile;
