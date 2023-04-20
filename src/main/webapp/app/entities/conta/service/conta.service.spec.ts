import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConta } from '../conta.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../conta.test-samples';

import { ContaService } from './conta.service';

const requireRestSample: IConta = {
  ...sampleWithRequiredData,
};

describe('Conta Service', () => {
  let service: ContaService;
  let httpMock: HttpTestingController;
  let expectedResult: IConta | IConta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Conta', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const conta = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(conta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Conta', () => {
      const conta = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(conta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Conta', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Conta', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Conta', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContaToCollectionIfMissing', () => {
      it('should add a Conta to an empty array', () => {
        const conta: IConta = sampleWithRequiredData;
        expectedResult = service.addContaToCollectionIfMissing([], conta);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conta);
      });

      it('should not add a Conta to an array that contains it', () => {
        const conta: IConta = sampleWithRequiredData;
        const contaCollection: IConta[] = [
          {
            ...conta,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContaToCollectionIfMissing(contaCollection, conta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Conta to an array that doesn't contain it", () => {
        const conta: IConta = sampleWithRequiredData;
        const contaCollection: IConta[] = [sampleWithPartialData];
        expectedResult = service.addContaToCollectionIfMissing(contaCollection, conta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conta);
      });

      it('should add only unique Conta to an array', () => {
        const contaArray: IConta[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contaCollection: IConta[] = [sampleWithRequiredData];
        expectedResult = service.addContaToCollectionIfMissing(contaCollection, ...contaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const conta: IConta = sampleWithRequiredData;
        const conta2: IConta = sampleWithPartialData;
        expectedResult = service.addContaToCollectionIfMissing([], conta, conta2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conta);
        expect(expectedResult).toContain(conta2);
      });

      it('should accept null and undefined values', () => {
        const conta: IConta = sampleWithRequiredData;
        expectedResult = service.addContaToCollectionIfMissing([], null, conta, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conta);
      });

      it('should return initial array if no Conta is added', () => {
        const contaCollection: IConta[] = [sampleWithRequiredData];
        expectedResult = service.addContaToCollectionIfMissing(contaCollection, undefined, null);
        expect(expectedResult).toEqual(contaCollection);
      });
    });

    describe('compareConta', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConta(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConta(entity1, entity2);
        const compareResult2 = service.compareConta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConta(entity1, entity2);
        const compareResult2 = service.compareConta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConta(entity1, entity2);
        const compareResult2 = service.compareConta(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
