import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = []

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this._usuarioService.getUsers().subscribe(users => this.usuarios = users);

  }

}
