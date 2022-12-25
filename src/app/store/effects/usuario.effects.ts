import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "../../services/usuario.service";
import * as usuariosActions from "../actions";

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private _usuariosService: UsuarioService
    ) { }

    cargaUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuario),
            mergeMap(
                ({ id }) => this._usuariosService.getUserById(id)
                    .pipe(
                        map(user => usuariosActions.cargarUsuarioSuccess({ usuario: user })),
                        catchError(error => {
                            return of(usuariosActions.cargarUsuariosError({ payload: error }))
                        })
                    )
            )
        )
    );

}