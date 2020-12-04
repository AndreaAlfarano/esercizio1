import { Component } from '@angular/core';
import { User } from './model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <h1>Titolo</h1>
  <h1>titolo2</h1>
    <div class="container">
      <form
        class="card card-body mt-2"
        #f="ngForm" (submit)="saveHandler(f)"
        [ngClass]="{
          'male': f.value.gender === 'M',
          'female': f.value.gender === 'F'
        }"
      >
        <input
          type="text"
          [ngModel]
          name="label"
          placeholder="Add user name"
          class="form-control"
          required
          #labelInput="ngModel"
          [ngClass]="{'is-invalid': labelInput.invalid && f.dirty}"
        >

        <select
          [ngModel]
          name="gender"
          class="form-control"
          required
          #genderInput="ngModel"
          [ngClass]="{'is-invalid': genderInput.invalid && f.dirty}"
        >
          <option [ngValue]="null">Select option</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>

        <button
          class="btn"
          [disabled]="f.invalid"
          [ngClass]="{
            'btn-dark': f.valid,
            'btn-warning': f.invalid
          }"
        >Save</button>
      </form>

      <hr>

      <div
        *ngFor="let u of users" class="list-group-item"
        [ngClass]="{
          'male': u.gender === 'M',
          'female': u.gender === 'F'
        }"
      >
        <i
          class="fa fa-3x"
          [ngClass]="{
            'fa-mars': u.gender === 'M',
            'fa-venus': u.gender === 'F'
          }"
        ></i>
        {{u.label}}

        <i class="fa fa-trash fa-2x pull-right" (click)="deleteHandler(u)"></i>
      </div>
    </div>
  `,
  styles: [`
    .male { background-color: #36caff; }
    .female { background-color: pink; }
    .card { transition: all 0.5s }
  `]
})
export class AppComponent {
  users: User[] = [
    { id: 1, label: 'Fabio', gender: 'M', age: 20 },
    { id: 2, label: 'Lorenzo', gender: 'M', age: 37 },
    { id: 3, label: 'Silvia', gender: 'F', age: 70 },
  ];

  deleteHandler(userToRemove: User) {
    this.users = this.users.filter(u => u.id !== userToRemove.id);
  }

  saveHandler(f: NgForm) {
    const user = f.value as User;
    user.id = Date.now(); // add a fake ID
    this.users = [...this.users, user]
    f.reset();
  }
}
