import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContaFormService } from './conta-form.service';
import { ContaService } from '../service/conta.service';
import { IConta } from '../conta.model';

import { ContaUpdateComponent } from './conta-update.component';

describe('Conta Management Update Component', () => {
  let comp: ContaUpdateComponent;
  let fixture: ComponentFixture<ContaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contaFormService: ContaFormService;
  let contaService: ContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContaUpdateComponent],
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
      .overrideTemplate(ContaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contaFormService = TestBed.inject(ContaFormService);
    contaService = TestBed.inject(ContaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const conta: IConta = { id: 456 };

      activatedRoute.data = of({ conta });
      comp.ngOnInit();

      expect(comp.conta).toEqual(conta);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConta>>();
      const conta = { id: 123 };
      jest.spyOn(contaFormService, 'getConta').mockReturnValue(conta);
      jest.spyOn(contaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conta }));
      saveSubject.complete();

      // THEN
      expect(contaFormService.getConta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contaService.update).toHaveBeenCalledWith(expect.objectContaining(conta));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConta>>();
      const conta = { id: 123 };
      jest.spyOn(contaFormService, 'getConta').mockReturnValue({ id: null });
      jest.spyOn(contaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conta }));
      saveSubject.complete();

      // THEN
      expect(contaFormService.getConta).toHaveBeenCalled();
      expect(contaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConta>>();
      const conta = { id: 123 };
      jest.spyOn(contaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
