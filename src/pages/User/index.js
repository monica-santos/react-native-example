import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';

import api from '../../services/api';
import {
  Author,
  Avatar,
  Bio,
  Container,
  Header,
  Info,
  Name,
  OwnerAvatar,
  Stars,
  Starred,
  Title,
} from './styles';

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

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
