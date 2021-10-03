import { User } from '../interfaces/user';
import { fakeUser } from '../data/user';

export const login = (loginInfo: User): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      // mock call
      resolve(
        loginInfo.login === fakeUser.login &&
        loginInfo.password === fakeUser.password);
    }, 500);
  });
