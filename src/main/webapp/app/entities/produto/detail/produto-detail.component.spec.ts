import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProdutoDetailComponent } from './produto-detail.component';

describe('Produto Management Detail Component', () => {
  let comp: ProdutoDetailComponent;
  let fixture: ComponentFixture<ProdutoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ produto: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProdutoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProdutoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load produto on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.produto).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
