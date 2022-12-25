import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "../../services/usuario.service";
import * as usuariosActions from "../actions";

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private _usuariosService: UsuarioService
    ) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            tap(data => console.log('effect tap ', data)),
            mergeMap(
                () => this._usuariosService.getUsers()
                    .pipe(
                        tap(data => console.log('getUsers effect', data)),
                        map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
                        catchError(error => {
                            console.log('lala error');
                            return of(usuariosActions.cargarUsuariosError({ payload: error }))
                        })
                    )
            )
        )
    );

}