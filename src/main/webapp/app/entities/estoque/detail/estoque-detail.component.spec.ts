import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstoqueDetailComponent } from './estoque-detail.component';

describe('Estoque Management Detail Component', () => {
  let comp: EstoqueDetailComponent;
  let fixture: ComponentFixture<EstoqueDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoqueDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ estoque: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EstoqueDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EstoqueDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load estoque on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.estoque).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
