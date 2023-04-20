import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VendaFormService } from './venda-form.service';
import { VendaService } from '../service/venda.service';
import { IVenda } from '../venda.model';

import { VendaUpdateComponent } from './venda-update.component';

describe('Venda Management Update Component', () => {
  let comp: VendaUpdateComponent;
  let fixture: ComponentFixture<VendaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vendaFormService: VendaFormService;
  let vendaService: VendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VendaUpdateComponent],
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
      .overrideTemplate(VendaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VendaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vendaFormService = TestBed.inject(VendaFormService);
    vendaService = TestBed.inject(VendaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const venda: IVenda = { id: 456 };

      activatedRoute.data = of({ venda });
      comp.ngOnInit();

      expect(comp.venda).toEqual(venda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVenda>>();
      const venda = { id: 123 };
      jest.spyOn(vendaFormService, 'getVenda').mockReturnValue(venda);
      jest.spyOn(vendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: venda }));
      saveSubject.complete();

      // THEN
      expect(vendaFormService.getVenda).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(vendaService.update).toHaveBeenCalledWith(expect.objectContaining(venda));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVenda>>();
      const venda = { id: 123 };
      jest.spyOn(vendaFormService, 'getVenda').mockReturnValue({ id: null });
      jest.spyOn(vendaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venda: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: venda }));
      saveSubject.complete();

      // THEN
      expect(vendaFormService.getVenda).toHaveBeenCalled();
      expect(vendaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVenda>>();
      const venda = { id: 123 };
      jest.spyOn(vendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vendaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
