import { IPerson } from '../../entitys/person';

export interface IFilmState {
  loading: boolean;
  loaded: boolean;
  persons: IPerson[];
}
