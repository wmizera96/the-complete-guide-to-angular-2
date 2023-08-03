import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectModel } from '../model/projectModel';
import { ProjectStatus } from '../model/projectStatus';
import { testValidator } from '../validators/testValidator';
import { emailValidator } from '../validators/emailValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        emailValidator
      ),
      projectData: new FormGroup({
        name: new FormControl(null, [Validators.required, testValidator]),
        status: new FormControl(),
      }),
    });
    this.form.setValue(new ProjectModel());
  }
  onSubmit() {
    console.log(this.form.value);
  }

  getOptions() {
    return [
      {
        value: ProjectStatus.Stable,
        description: 'Stable state',
      },
      {
        value: ProjectStatus.Critical,
        description: 'Critical state',
      },
      {
        value: ProjectStatus.Finished,
        description: 'Completed',
      },
    ];
  }
}
