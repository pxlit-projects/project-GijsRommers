import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejectDialogComponent } from './reject-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RejectDialogComponent', () => {
  let component: RejectDialogComponent;
  let fixture: ComponentFixture<RejectDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RejectDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RejectDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { postId: 1 } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RejectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog without reason when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should close dialog with reason when onReject is called', () => {
    component.reason = 'Test reason';
    component.onReject();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('Test reason');
  });

  it('should initialize reason as an empty string', () => {
    expect(component.reason).toBe('');
  });

  it('should close dialog with empty reason if no reason is provided', () => {
    component.onReject();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('');
  });
});
