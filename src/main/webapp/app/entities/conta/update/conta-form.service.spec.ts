import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../conta.test-samples';

import { ContaFormService } from './conta-form.service';

describe('Conta Form Service', () => {
  let service: ContaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaFormService);
  });

  describe('Service methods', () => {
    describe('createContaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            telefone: expect.any(Object),
            equipe: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });

      it('passing IConta should create a new form with FormGroup', () => {
        const formGroup = service.createContaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            telefone: expect.any(Object),
            equipe: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });
    });

    describe('getConta', () => {
      it('should return NewConta for default Conta initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContaFormGroup(sampleWithNewData);

        const conta = service.getConta(formGroup) as any;

        expect(conta).toMatchObject(sampleWithNewData);
      });

      it('should return NewConta for empty Conta initial value', () => {
        const formGroup = service.createContaFormGroup();

        const conta = service.getConta(formGroup) as any;

        expect(conta).toMatchObject({});
      });

      it('should return IConta', () => {
        const formGroup = service.createContaFormGroup(sampleWithRequiredData);

        const conta = service.getConta(formGroup) as any;

        expect(conta).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConta should not enable id FormControl', () => {
        const formGroup = service.createContaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConta should disable id FormControl', () => {
        const formGroup = service.createContaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
