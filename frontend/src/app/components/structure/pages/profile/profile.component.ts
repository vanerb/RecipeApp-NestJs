import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../../../services/recipes.service";
import {ModalService} from "../../../../services/modal.service";
import {UsersService} from "../../../../services/users.service";
import {AuthService} from "../../../../services/auth.service";
import {CategoriesService} from "../../../../services/categories.service";
import {ActivatedRoute} from "@angular/router";
import {UpdateUser, User} from "../../../../interfaces/users";
import {firstValueFrom} from "rxjs";
import {DeleteModalComponent} from "../../utilities/delete-modal/delete-modal.component";
import {WarningModalComponent} from "../../utilities/warning-modal/warning-modal.component";
import {UtilitiesService} from "../../../../services/utilities.service";
import {LoaderComponent} from "../../utilities/loader/loader.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  form: FormGroup;

  formPassword: FormGroup
  user: User | null = null
  id: string = ""

  constructor(
    private fb: FormBuilder,
    private readonly recipesService: RecipesService,
    private readonly modalService: ModalService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly categoryService: CategoriesService,
    private readonly route: ActivatedRoute,
    private readonly utilitiesService: UtilitiesService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });

    this.formPassword = this.fb.group({
      password: [''],
      repeatPassword: ['']
    });
  }

  close() {

  }


  async updatePassword() {
    if (this.formPassword.get('password')?.value === this.formPassword.get('repeatPassword')?.value) {
      if (this.formPassword.get('password')?.value !== '') {
        this.modalService.open(LoaderComponent, {}, {text: 'Actualizando contraseña...'})
        await this.utilitiesService.sleep(1000)
        const command: UpdateUser = {
          password: this.formPassword.get('password')?.value
        }
        this.userService.update(this.id, command).subscribe({
          next: (user) => {

          },
          error: (err) => {
            console.error(err)
          }
        });
      } else {
        this.modalService.open(WarningModalComponent, {
            width: '450px',
          },
          {
            title: "Aviso",
            message: "La contraseña no puede estar vacio"
          }).then(async () => {
          console.log('✘ Cancelado');
          this.modalService.close()
        })
          .catch(() => {
            console.log('✘ Cancelado');
            this.modalService.close()
          });

      }

    } else {
      this.modalService.open(WarningModalComponent, {
          width: '450px',
        },
        {
          title: "Aviso",
          message: "La contraseña no coincide"
        }).then(async () => {
        console.log('✘ Cancelado');
        this.modalService.close()
      })
        .catch(() => {
          console.log('✘ Cancelado');
          this.modalService.close()
        });
    }
    this.modalService.close()

  }

  async updateProfile() {
    if (!this.form.valid) {
      this.modalService.open(WarningModalComponent, {
          width: '450px',
        },
        {
          title: "Aviso",
          message: "Hay errores en el formulario, reviselo."
        }).then(async () => {

      })

      console.log(this.form)
      return
    }

    this.modalService.open(LoaderComponent, {}, {text: 'Editando perfil...'})
    await this.utilitiesService.sleep(1000)

    const command: UpdateUser = {
      name: this.form.get('name')?.value
    }
    this.userService.update(this.id, command).subscribe({
      next: (user) => {

      },
      error: (err) => {
        console.error(err)
      }
    });

    this.modalService.close()
  }

  async ngOnInit() {
    const user = await firstValueFrom(this.userService.getByToken(this.authService.getToken() ?? ''));
    this.form.get('name')?.setValue(user.name)
    this.id = user.id
  }
}
