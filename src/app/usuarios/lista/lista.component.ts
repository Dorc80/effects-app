import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
// import { UsuarioService } from '../../services/usuario.service';
import { Store } from '@ngrx/store'
import { AppState } from '../../store/app.reducers';
import * as usuariosActions from '../../store/actions'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  // constructor(private _usuarioService: UsuarioService) { }
  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {

    this._store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error
    })

    // this._usuarioService.getUsers().subscribe(users => this.usuarios = users);
    this._store.dispatch(usuariosActions.cargarUsuarios())

  }

}
