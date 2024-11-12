import { Component } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService], // Declare the service locally since it's a standalone component
  imports: [FormsModule, NgFor]
})
export class StudentComponent {
  students: Student[] = [];
  studentForm: Student = { id: 0, name: '', age: 0, email: '' };
  isEditMode = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // Load all students
  loadStudents(): void {
    this.studentService.getStudents().subscribe((studentList) => {
      console.log(studentList)
      this.students = studentList;
    });
  }

  // Save new or updated student
  saveStudent(): void {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.studentForm).subscribe((student) => {
        if (student) {
          this.loadStudents();
          this.resetForm();
        }
      });
    } else {
      this.studentService.createStudent(this.studentForm).subscribe((student) => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  // Edit an existing student
  editStudent(student: Student): void {
    this.studentForm = { ...student };
    this.isEditMode = true;
  }

  // Delete a student
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  // Reset the form
  resetForm(): void {
    this.studentForm = { id: 0, name: '', age: 0, email: '' };
    this.isEditMode = false;
  }
}
