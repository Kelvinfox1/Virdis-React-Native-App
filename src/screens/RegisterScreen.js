/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userActions';

const RegisterScreen = ({navigation}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const {loading, error, userInfo} = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('HomeScreen');
    }
  }, [navigation, userInfo]);

  const _onSignUpPressed = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    }
    dispatch(register(fname, lname, phone, email, password));
    console.log(password);
  };
  return (
    <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <Background>
            <BackButton goBack={() => navigation.navigate('SignIn')} />

            <Logo />

            <Header>Create Account</Header>

            {message && <Message>{message}</Message>}
            {error && <Message>{error}</Message>}
            {loading && <Loader />}

            <TextInput
              label=" First Name"
              returnKeyType="next"
              value={fname}
              onChangeText={(text) => setFname(text)}
              error={!!fname.error}
              errorText={fname.error}
            />

            <TextInput
              label=" Second Name"
              returnKeyType="next"
              value={lname}
              onChangeText={(text) => setLname(text)}
              error={!!lname.error}
              errorText={lname.error}
            />

            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail(text)}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <TextInput
              label="Phone Number"
              keyboardType="numeric"
              returnKeyType="next"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              error={!!phone.error}
              errorText={phone.error}
            />

            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword(text)}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />

            <TextInput
              label="confirm password"
              returnKeyType="done"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              error={!!confirmPassword.error}
              errorText={confirmPassword.error}
              secureTextEntry
            />

            <Button mode="contained" onPress={_onSignUpPressed}>
              Sign Up
            </Button>

            <View style={styles.row}>
              <Text style={styles.label}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </Background>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
