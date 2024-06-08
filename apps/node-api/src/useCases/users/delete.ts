import {Uid} from 'domain/models/values';
import {type Response} from 'domain/models';
import {resolve} from '@/lib/di';

export class DeleteUser {
  private readonly _repository = resolve('usersRepository');
  private readonly _uid: Uid;

  constructor(uid: string) {
    this._uid = new Uid(uid);
  }

  async run(): Promise<Response<true>> {
    return await this._repository.delete(this._uid);
  }
}
