import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesAtividadePage } from './detalhes-atividade.page';

describe('DetalhesAtividadePage', () => {
  let component: DetalhesAtividadePage;
  let fixture: ComponentFixture<DetalhesAtividadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAtividadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
