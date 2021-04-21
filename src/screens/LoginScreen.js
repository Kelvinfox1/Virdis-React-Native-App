/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {login} from '../actions/userActions';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('HomeScreen');
    }
  }, [navigation, userInfo]);

  const _onLoginPressed = () => {
    dispatch(login(email, password));
    console.log('pressed');
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
            <Logo />
            <Header>Welcome back.</Header>
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email}
              onChangeText={(text) => setEmail(text)}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <TextInput
              label="Password"
              returnKeyType="done"
              value={password}
              onChangeText={(text) => setPassword(text)}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry={true}
            />

            <Button mode="contained" onPress={_onLoginPressed}>
              Login
            </Button>

            <View style={styles.row}>
              <Text style={styles.label}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>Sign up</Text>
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
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default LoginScreen;
