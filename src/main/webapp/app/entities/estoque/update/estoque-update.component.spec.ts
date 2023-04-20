import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EstoqueFormService } from './estoque-form.service';
import { EstoqueService } from '../service/estoque.service';
import { IEstoque } from '../estoque.model';

import { EstoqueUpdateComponent } from './estoque-update.component';

describe('Estoque Management Update Component', () => {
  let comp: EstoqueUpdateComponent;
  let fixture: ComponentFixture<EstoqueUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let estoqueFormService: EstoqueFormService;
  let estoqueService: EstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EstoqueUpdateComponent],
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
      .overrideTemplate(EstoqueUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EstoqueUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    estoqueFormService = TestBed.inject(EstoqueFormService);
    estoqueService = TestBed.inject(EstoqueService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const estoque: IEstoque = { id: 456 };

      activatedRoute.data = of({ estoque });
      comp.ngOnInit();

      expect(comp.estoque).toEqual(estoque);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstoque>>();
      const estoque = { id: 123 };
      jest.spyOn(estoqueFormService, 'getEstoque').mockReturnValue(estoque);
      jest.spyOn(estoqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ estoque });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: estoque }));
      saveSubject.complete();

      // THEN
      expect(estoqueFormService.getEstoque).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(estoqueService.update).toHaveBeenCalledWith(expect.objectContaining(estoque));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstoque>>();
      const estoque = { id: 123 };
      jest.spyOn(estoqueFormService, 'getEstoque').mockReturnValue({ id: null });
      jest.spyOn(estoqueService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ estoque: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: estoque }));
      saveSubject.complete();

      // THEN
      expect(estoqueFormService.getEstoque).toHaveBeenCalled();
      expect(estoqueService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstoque>>();
      const estoque = { id: 123 };
      jest.spyOn(estoqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ estoque });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(estoqueService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
