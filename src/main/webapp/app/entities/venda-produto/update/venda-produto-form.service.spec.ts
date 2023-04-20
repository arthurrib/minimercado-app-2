import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../venda-produto.test-samples';

import { VendaProdutoFormService } from './venda-produto-form.service';

describe('VendaProduto Form Service', () => {
  let service: VendaProdutoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendaProdutoFormService);
  });

  describe('Service methods', () => {
    describe('createVendaProdutoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVendaProdutoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            qtd: expect.any(Object),
            valorUnitario: expect.any(Object),
            desconto: expect.any(Object),
          })
        );
      });

      it('passing IVendaProduto should create a new form with FormGroup', () => {
        const formGroup = service.createVendaProdutoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            qtd: expect.any(Object),
            valorUnitario: expect.any(Object),
            desconto: expect.any(Object),
          })
        );
      });
    });

    describe('getVendaProduto', () => {
      it('should return NewVendaProduto for default VendaProduto initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVendaProdutoFormGroup(sampleWithNewData);

        const vendaProduto = service.getVendaProduto(formGroup) as any;

        expect(vendaProduto).toMatchObject(sampleWithNewData);
      });

      it('should return NewVendaProduto for empty VendaProduto initial value', () => {
        const formGroup = service.createVendaProdutoFormGroup();

        const vendaProduto = service.getVendaProduto(formGroup) as any;

        expect(vendaProduto).toMatchObject({});
      });

      it('should return IVendaProduto', () => {
        const formGroup = service.createVendaProdutoFormGroup(sampleWithRequiredData);

        const vendaProduto = service.getVendaProduto(formGroup) as any;

        expect(vendaProduto).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVendaProduto should not enable id FormControl', () => {
        const formGroup = service.createVendaProdutoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVendaProduto should disable id FormControl', () => {
        const formGroup = service.createVendaProdutoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
