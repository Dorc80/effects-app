import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { cargarUsuario } from '../../store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private _router: ActivatedRoute,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this._store.select('usuario').subscribe(({ user }) => {
      this.usuario = user;
    });

    this._router.params.subscribe(({ id }) => {
      console.log(id)
      this._store.dispatch(cargarUsuario({ id }))
    })

  }

}
