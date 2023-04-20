import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContaDetailComponent } from './conta-detail.component';

describe('Conta Management Detail Component', () => {
  let comp: ContaDetailComponent;
  let fixture: ComponentFixture<ContaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ conta: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load conta on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.conta).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
