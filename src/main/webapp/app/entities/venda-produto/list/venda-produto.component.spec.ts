import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VendaProdutoService } from '../service/venda-produto.service';

import { VendaProdutoComponent } from './venda-produto.component';

describe('VendaProduto Management Component', () => {
  let comp: VendaProdutoComponent;
  let fixture: ComponentFixture<VendaProdutoComponent>;
  let service: VendaProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'venda-produto', component: VendaProdutoComponent }]), HttpClientTestingModule],
      declarations: [VendaProdutoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(VendaProdutoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VendaProdutoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VendaProdutoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.vendaProdutos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to vendaProdutoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVendaProdutoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVendaProdutoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
