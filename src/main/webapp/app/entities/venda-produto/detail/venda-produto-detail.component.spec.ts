import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VendaProdutoDetailComponent } from './venda-produto-detail.component';

describe('VendaProduto Management Detail Component', () => {
  let comp: VendaProdutoDetailComponent;
  let fixture: ComponentFixture<VendaProdutoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendaProdutoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ vendaProduto: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VendaProdutoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VendaProdutoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load vendaProduto on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.vendaProduto).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
