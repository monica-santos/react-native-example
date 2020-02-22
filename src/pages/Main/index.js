import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { func, shape } from 'prop-types';
import {
  Avatar,
  Bio,
  Container,
  Form,
  Input,
  List,
  Name,
  ProfileButton,
  ProfileButtonText,
  User,
  SubmitButton,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) this.setState({ users: JSON.parse(users) });
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users)
      AsyncStorage.setItem('users', JSON.stringify(users));
  }

  handleNavigate = user => {
    const {
      navigation: { navigate },
    } = this.props;

    navigate({ name: 'User', params: { user } });
  };

  handleAddUser = async () => {
    this.setState({ loading: true });
    const { newUser, users } = this.state;
    try {
      const response = await api.get(`/users/${newUser}`);
      const {
        data: { name, login, bio, avatar_url },
      } = response;
      this.setState({
        users: [...users, { name, login, bio, avatar_url }],
        newUser: '',
        loading: false,
      });

      Keyboard.dismiss();
    } catch (err) {
      console.tron.log(err);
      this.setState({ loading: false });
    }
  };

  static navigationOptions = {
    headerTitle: 'Usuários',
  };

  render() {
    const { loading, newUser, users } = this.state;
    return (
      <Container>
        <Form>
          <Input
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar_url }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
