import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root', // No need for a module here, as we are using standalone components
})
export class StudentService {
  private students: Student[] = [];
  private nextId = 1;

  constructor() {}

  // Create Student
  createStudent(student: Student): Observable<Student> {
    student.id = this.nextId++;
    this.students.push(student);
    return of(student);
  }

  // Get all students
  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  // Get a student by ID
  getStudentById(id: number): Observable<Student | undefined> {
    return of(this.students.find(student => student.id === id));
  }

  // Update student by ID
  updateStudent(updatedStudent: Student): Observable<Student | undefined> {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      return of(updatedStudent);
    }
    return of(undefined);
  }

  // Delete student by ID
  deleteStudent(id: number): Observable<void> {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
    return of();
  }
}
