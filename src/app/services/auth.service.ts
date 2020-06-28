import { Injectable } from '@angular/core';
import { Observable, throwError, from, BehaviorSubject, of, combineLatest } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import createAuth0Client from '@auth0/auth0-spa-js';
import { Router } from '@angular/router';

//old domain : 
//old client_id : 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client$ = (from(
    createAuth0Client({
      domain: "dev-2rygq214.auth0.com",
      client_id: "8Xdm83JCJZOQ6sVZ7IE6NtwFkye5qUEC",
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError(err => throwError(err))
  );


  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );


  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);

  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;
  

  constructor(private router: Router) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }


  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }


  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: Boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }

        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }



  login(redirectPath: string = '/') {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath }
      })
    })
  }



  private handleAuthCallback() {
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string;
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap(cbRes => {
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),

        concatMap(() => {
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );

      authComplete$.subscribe(([user, loggedIn]) => {
        this.router.navigate([targetRoute]);
      });
    }
  }


  logout(): void {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: "8Xdm83JCJZOQ6sVZ7IE6NtwFkye5qUEC",
        returnTo: `${window.location.origin}`
      });
    });
  }

  getTokenSilently$(options?): Observable<string> {
    console.log("Get stored toke...");
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }


}
