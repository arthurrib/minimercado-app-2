import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VendaDetailComponent } from './venda-detail.component';

describe('Venda Management Detail Component', () => {
  let comp: VendaDetailComponent;
  let fixture: ComponentFixture<VendaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ venda: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VendaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VendaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load venda on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.venda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
