import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AmigoSecretoService } from '../../core/services/amigo-secreto.service';

export const senhasIguaisValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const senha = control.get('senha');
  const confirmarSenha = control.get('confirmarSenha');

  if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
    confirmarSenha.setErrors({ mismatch: true });
    return { mismatch: true };
  } else if (confirmarSenha && confirmarSenha.hasError('mismatch')) {
    const remainingErrors = { ...confirmarSenha.errors };
    delete remainingErrors['mismatch'];
    confirmarSenha.setErrors(Object.keys(remainingErrors).length > 0 ? remainingErrors : null);
  }

  return null;
};

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent {
  private router = inject(Router);
  private amigoSecretoService = inject(AmigoSecretoService);
  private fb = inject(FormBuilder);

  cadastroForm = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
    },
    { validators: [senhasIguaisValidator] }
  );

  async onSubmit() {
    if (this.cadastroForm.invalid) return;

    const { nome, email, senha } = this.cadastroForm.getRawValue();
    try {
      await this.amigoSecretoService.cadastrarUsuario(email, senha, nome);
      
      // Auto login após cadastro
      await this.amigoSecretoService.login(email, senha);
      
      this.router.navigate(['/criacao-grupo']);
    } catch (error) {
      console.error('Erro ao cadastrar usuário no Supabase:', error);
      alert('Erro ao realizar cadastro.');
    }
  }
}
