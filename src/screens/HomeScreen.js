/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';

import Background from '../components/Background';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import QRCode from 'react-native-qrcode-svg';
import {getUserDetails, logout} from '../actions/userActions';

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [points, setPoints] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [qrId, setQrId] = useState();
  const [CardId, setCardId] = useState();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user} = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate('SignIn');
    } else {
      if (!user || !user.fname) {
        dispatch(getUserDetails());
      } else {
        setEmail(user.email);
        setPoints(user.points);
        setFname(user.fname);
        setLname(user.lname);
        setCardId(user.CardId);
        setQrId(user.qrId);
      }
    }
  }, [dispatch, navigation, user, userInfo]);

  return (
    <Background>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}

      <Header>Welcome {fname}</Header>

      <Paragraph>Scan with our Bin to earn points.</Paragraph>
      <QRCode value={JSON.stringify(qrId)} />
      <Header>User Info</Header>
      <Paragraph>Email : {email}</Paragraph>
      <Paragraph>Points : {points} </Paragraph>
      <Paragraph>Card ID : {CardId}</Paragraph>

      <Button mode="outlined" onPress={logoutHandler}>
        Logout
      </Button>
    </Background>
  );
};

export default HomeScreen;
