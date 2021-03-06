import { Injectable } from '@angular/core';
import { LocalStorage } from 'src/app/app.localStorage';
import { Observable } from 'rxjs';
import { DFConfigApi } from 'src/app/app.config';
import { map } from 'rxjs/operators';
import { DFHttManager } from 'src/app/util/network/network.manager';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LoginService {
  private user = {
    username: "",
    password: ""
  }

  constructor(private dFHttManager: DFHttManager, private localStorage: LocalStorage) { }

  onLogin(username, password): Observable<any> {
    this.user.username = username;
    this.user.password = password;
    return this.dFHttManager.post(DFConfigApi.paths.loginin, this.user).pipe(
      map(x => {
        const helper = new JwtHelperService();
        const userInfo= helper.decodeToken(x.data.token);
        this.localStorage.set('TOKEN', x.data.token);//保存token信息
        this.localStorage.set('USER', userInfo.username);
        this.localStorage.set('NAME',userInfo.name);
      })
    )
  }

}