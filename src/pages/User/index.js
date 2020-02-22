import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';

import api from '../../services/api';
import { Avatar, Bio, Container, Header, Name } from './styles';

export default class User extends Component {
  static navigationOptions = properties => {
    return { title: properties.route.params.user.name };
  };

  static propTypes = {
    route: shape({
      params: shape({
        user: shape({
          avatar_url: string,
          bio: string,
          login: string.isRequired,
          name: string,
        }),
      }),
    }).isRequired,
    navigation: shape({
      setOptions: func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    console.tron.log({ props: this.props });
    const {
      route: {
        params: { user },
      },
      navigation: { setOptions },
    } = this.props;
    setOptions({
      title: user.name,
    });
    const { data } = await api.get(`/users/${user.login}/starred`);
    this.setState({
      stars: data,
    });
  }

  render() {
    const { stars } = this.state;
    const {
      route: {
        params: { user },
      },
    } = this.props;
    console.tron.log({ stars });

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar_url }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
      </Container>
    );
  }
}
