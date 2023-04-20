import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VendaProdutoFormService } from './venda-produto-form.service';
import { VendaProdutoService } from '../service/venda-produto.service';
import { IVendaProduto } from '../venda-produto.model';

import { VendaProdutoUpdateComponent } from './venda-produto-update.component';

describe('VendaProduto Management Update Component', () => {
  let comp: VendaProdutoUpdateComponent;
  let fixture: ComponentFixture<VendaProdutoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vendaProdutoFormService: VendaProdutoFormService;
  let vendaProdutoService: VendaProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VendaProdutoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(VendaProdutoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VendaProdutoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vendaProdutoFormService = TestBed.inject(VendaProdutoFormService);
    vendaProdutoService = TestBed.inject(VendaProdutoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const vendaProduto: IVendaProduto = { id: 456 };

      activatedRoute.data = of({ vendaProduto });
      comp.ngOnInit();

      expect(comp.vendaProduto).toEqual(vendaProduto);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVendaProduto>>();
      const vendaProduto = { id: 123 };
      jest.spyOn(vendaProdutoFormService, 'getVendaProduto').mockReturnValue(vendaProduto);
      jest.spyOn(vendaProdutoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vendaProduto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vendaProduto }));
      saveSubject.complete();

      // THEN
      expect(vendaProdutoFormService.getVendaProduto).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(vendaProdutoService.update).toHaveBeenCalledWith(expect.objectContaining(vendaProduto));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVendaProduto>>();
      const vendaProduto = { id: 123 };
      jest.spyOn(vendaProdutoFormService, 'getVendaProduto').mockReturnValue({ id: null });
      jest.spyOn(vendaProdutoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vendaProduto: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vendaProduto }));
      saveSubject.complete();

      // THEN
      expect(vendaProdutoFormService.getVendaProduto).toHaveBeenCalled();
      expect(vendaProdutoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVendaProduto>>();
      const vendaProduto = { id: 123 };
      jest.spyOn(vendaProdutoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vendaProduto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vendaProdutoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
