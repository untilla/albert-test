import { IFilm } from '../entitys/film';

export interface IAppState {
  loading: boolean;
  loaded: boolean;
  films: IFilm[];
}
