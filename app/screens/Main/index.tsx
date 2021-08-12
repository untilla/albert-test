import React, { useMemo } from 'react';
import Constants from 'expo-constants';
import moment from 'moment';
import styled from 'styled-components/native';
import { RefreshControl, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { convertToRoman } from '../../lib/convertToRoman';
import { fetchFilms } from '../../redux/actions';

const MainView = styled.View.attrs(() => ({
  paddingTop: Constants.statusBarHeight,
}))`
  flex: 1;
  background-color: #292929;
`;

const MainContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    backgroundColor: '#242424',
    flex: 1,
  },
}))`
  background: #292929;
`;

const HeaderContainer = styled.View.attrs(() => ({
  height: 240 - Constants.statusBarHeight,
}))`
  background-color: #292929;
  border-bottom-right-radius: 36px;
  flex-direction: column;
  justify-content: flex-end;
`;

const UserContainer = styled.View`
  margin-left: 32px;
  flex-direction: row;
`;

const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

const UserInfo = styled.View`
  flex-direction: column;
  margin-left: 24px;
  justify-content: center;
`;

const UserHello = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
`;

const SeeWhatNext = styled.Text`
  font-family: Lato-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #999999;
`;

const SearchContainer = styled.View`
  margin: 24px 32px 32px;
  background: #333333;
  border-radius: 8px;
  height: 48px;
  flex-direction: row;
`;

const SearchButton = styled.Image`
  margin: 12px;
  width: 24px;
  height: 24px;
`;

const SearchInput = styled(TextInput)`
  margin: 12px 0;
  flex: 1;
  border-right-width: 1px;
  border-color: #999999;
  color: #999999;
  padding-right: 12px;
  font-family: Lato-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

const MainTitle = styled.Text`
  font-family: Gilroy-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #999999;
  margin: 32px 32px 24px;
`;

const PostersContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingLeft: 32,
    paddingRight: 8,
  },
}))``;

const FilmBlock = styled.View`
  flex-direction: column;
  margin-right: 16px;
`;

const FilmPosterContainer = styled.View`
  width: 255px;
  height: 328px;
  border-radius: 8px;
  background-color: #090b08;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
`;

const FilmPoster = styled.Image`
  width: 191px;
  height: 290px;
`;

const FilmTitle = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
`;

const FilmSubTitle = styled.Text`
  font-family: Lato-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #999999;
`;

const YearContainer = styled.View`
  margin-top: 32px;
  width: 35px;
  height: 19px;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  border-radius: 16px;
`;

const YearText = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
`;

const Main: React.FC = (): JSX.Element => {
  const { films, loading } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const posters = useMemo(
    () => [
      require(`./assets/images/posters/1.jpeg`),
      require(`./assets/images/posters/2.jpeg`),
      require(`./assets/images/posters/3.jpeg`),
      require(`./assets/images/posters/4.jpeg`),
      require(`./assets/images/posters/5.jpeg`),
      require(`./assets/images/posters/6.jpeg`),
      require(`./assets/images/posters/7.jpeg`),
      require(`./assets/images/posters/8.jpeg`),
      require(`./assets/images/posters/9.jpeg`),
    ],
    [],
  );
  return (
    <MainView>
      <MainContainer
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchFilms())}
            tintColor="white"
          />
        }
      >
        <HeaderContainer>
          <UserContainer>
            <Avatar source={require('./assets/images/avatar.png')} />
            <UserInfo>
              <UserHello>Hi, Darrell</UserHello>
              <SeeWhatNext>See What’s Next</SeeWhatNext>
            </UserInfo>
          </UserContainer>
          <SearchContainer>
            <SearchButton source={require('./assets/images/search.png')} />
            <SearchInput
              placeholder="Search Movies"
              placeholderTextColor="#999999"
            />
            <SearchButton source={require('./assets/images/mic_none.png')} />
          </SearchContainer>
        </HeaderContainer>
        <MainTitle>Star Wars films:</MainTitle>
        <PostersContainer horizontal showsHorizontalScrollIndicator={false}>
          {films.map((film, key) => {
            const poster = posters[film.episode_id - 1] || posters[0];
            return (
              <FilmBlock key={key}>
                <FilmPosterContainer>
                  <FilmPoster source={poster} />
                </FilmPosterContainer>
                <FilmTitle>Episode {convertToRoman(film.episode_id)}</FilmTitle>
                <FilmSubTitle>{film.title}</FilmSubTitle>
                <YearContainer>
                  <YearText>{moment(film.release_date).year()}</YearText>
                </YearContainer>
              </FilmBlock>
            );
          })}
        </PostersContainer>
      </MainContainer>
    </MainView>
  );
};

export default Main;
