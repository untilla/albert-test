import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootState } from '../../redux/store';
import { fetchPersons } from './actions';
import { IPerson } from '../../entitys/person';
import { convertToRoman } from '../../lib/convertToRoman';

const MainView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    backgroundColor: '#080808',
    flex: 1,
  },
}))`
  background: #080808;
`;

const BgImage = styled.ImageBackground`
  width: 417px;
  height: 416px;
  position: absolute;
  left: 0;
  top: 0;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 32px;
  top: 80px;
`;

const BackButtonImg = styled.Image`
  width: 24px;
  height: 24px;
`;

const HeaderContainer = styled.View`
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;

const FilmTitle = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
`;

const FilmSubTitle = styled.Text`
  font-family: Lato-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: #999999;
  margin: 2px 0 10px;
`;

const YearContainer = styled.View`
  width: 35px;
  height: 19px;
  justify-content: center;
  align-items: center;
  background-color: #facb03;
  border-radius: 16px;
`;

const YearText = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  color: #000000;
`;

const PlayButton = styled.TouchableOpacity`
  margin: 32px 0 45px;
`;

const PlayButtonImg = styled.Image`
  width: 56px;
  height: 56px;
`;

const AboutContainer = styled.View`
  flex-direction: column;
  margin: 0 32px;
`;

const AboutTitle = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
`;

const AboutText = styled.Text`
  font-family: Lato-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #999999;
  margin-top: 8px;
  height: 76px;
`;

const Separator = styled.Image`
  width: 309px;
  height: 24px;
  margin-top: 29px;
  align-self: center;
`;

const Characters = styled.Text`
  font-family: Gilroy-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #999999;
  margin: 32px 0 0 32px;
`;

const PersonInfoContainer = styled.View`
  margin: 24px 32px 0;
  flex-direction: row;
`;

const PersonNameContainer = styled.View`
  flex-direction: column;
  width: 130px;
`;

const PersonNameWrapper = styled.View`
  height: 40px;
  padding-top: 2px;
`;

const PersonNameText = styled.Text`
  font-family: Gilroy-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
`;

const PointerContainer = styled.View`
  width: 24px;
`;

const Pointer = styled(Animated.Image)`
  width: 24px;
  height: 24px;
`;

const PersonDetailsContainer = styled.View`
  flex-direction: column;
  margin: 4px 0 0 16px;
`;

const PersonDetailsLine = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const PersonDetailsText = styled(Text)`
  font-family: Lato-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #ffffff;
`;

const PersonDetailsLeft = styled(PersonDetailsText)`
  width: 60px;
  margin-right: 24px;
`;

const Loader = styled.ActivityIndicator`
  margin-top: 32px;
`;

const FilmDetails: React.FC = (): JSX.Element => {
  const arrow = useRef(new Animated.ValueXY());
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { film } = route.params;
  const { persons, loading, loaded } = useSelector(
    (state: RootState) => state.film,
  );
  const [person, setPerson] = useState<number>(0);
  const handleSetPerson = useCallback(
    (key: number) => {
      setPerson(key);
      Animated.spring(arrow.current, {
        toValue: { x: 0, y: key * 40 },
        useNativeDriver: true,
      }).start();
    },
    [arrow],
  );
  const personFields: Record<string, string> = useMemo(
    () => ({
      birth_year: 'Birth year',
      gender: 'Gender',
      height: 'Height',
      mass: 'Mass',
      hair_color: 'Hair',
      skin_color: 'Skin',
      eye_color: 'Eye',
    }),
    [],
  );
  useEffect(() => {
    dispatch(fetchPersons(film.characters.slice(0, 5)));
  }, [dispatch, film]);
  return (
    <MainView>
      <BgImage source={require('./assets/images/darth.png')} />
      <HeaderContainer>
        <FilmTitle>Episode {convertToRoman(film.episode_id)}</FilmTitle>
        <FilmSubTitle>{film.title}</FilmSubTitle>
        <YearContainer>
          <YearText>{moment(film.release_date).year()}</YearText>
        </YearContainer>
        <PlayButton>
          <PlayButtonImg source={require('./assets/images/play.png')} />
        </PlayButton>
      </HeaderContainer>
      <AboutContainer>
        <AboutTitle>About</AboutTitle>
        <AboutText>
          We find ourselves at the very time when the Jedi Knights still keep
          peace and tranquility in the Galaxy. But a dark force, ready to
          swallow planets and peoples, has already awakened
        </AboutText>
      </AboutContainer>
      <Separator source={require('./assets/images/seporator.png')} />
      {!loaded ? (
        <Loader size="large" animating={loading} />
      ) : (
        <>
          <Characters>Characters:</Characters>
          <PersonInfoContainer>
            <PersonNameContainer>
              {persons.map((char, key) => (
                <PersonNameWrapper key={key}>
                  <TouchableOpacity onPress={() => handleSetPerson(key)}>
                    <PersonNameText>{char.name}</PersonNameText>
                  </TouchableOpacity>
                </PersonNameWrapper>
              ))}
            </PersonNameContainer>
            <PointerContainer>
              <Pointer
                source={require('./assets/images/double_arrow.png')}
                style={{
                  transform: [{ translateY: arrow.current.y }],
                }}
              />
            </PointerContainer>
            <PersonDetailsContainer>
              {Object.keys(personFields).map((field, key) => (
                <PersonDetailsLine key={key}>
                  <PersonDetailsLeft>{personFields[field]}</PersonDetailsLeft>
                  <PersonDetailsText>
                    {persons[person][field as keyof IPerson]}
                  </PersonDetailsText>
                </PersonDetailsLine>
              ))}
            </PersonDetailsContainer>
          </PersonInfoContainer>
        </>
      )}
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonImg source={require('./assets/images/arrow_back_ios.png')} />
      </BackButton>
    </MainView>
  );
};

export default FilmDetails;
