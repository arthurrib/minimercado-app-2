import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVendaProduto } from '../venda-produto.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../venda-produto.test-samples';

import { VendaProdutoService } from './venda-produto.service';

const requireRestSample: IVendaProduto = {
  ...sampleWithRequiredData,
};

describe('VendaProduto Service', () => {
  let service: VendaProdutoService;
  let httpMock: HttpTestingController;
  let expectedResult: IVendaProduto | IVendaProduto[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VendaProdutoService);
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

    it('should create a VendaProduto', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const vendaProduto = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(vendaProduto).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VendaProduto', () => {
      const vendaProduto = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(vendaProduto).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VendaProduto', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VendaProduto', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VendaProduto', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVendaProdutoToCollectionIfMissing', () => {
      it('should add a VendaProduto to an empty array', () => {
        const vendaProduto: IVendaProduto = sampleWithRequiredData;
        expectedResult = service.addVendaProdutoToCollectionIfMissing([], vendaProduto);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vendaProduto);
      });

      it('should not add a VendaProduto to an array that contains it', () => {
        const vendaProduto: IVendaProduto = sampleWithRequiredData;
        const vendaProdutoCollection: IVendaProduto[] = [
          {
            ...vendaProduto,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVendaProdutoToCollectionIfMissing(vendaProdutoCollection, vendaProduto);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VendaProduto to an array that doesn't contain it", () => {
        const vendaProduto: IVendaProduto = sampleWithRequiredData;
        const vendaProdutoCollection: IVendaProduto[] = [sampleWithPartialData];
        expectedResult = service.addVendaProdutoToCollectionIfMissing(vendaProdutoCollection, vendaProduto);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vendaProduto);
      });

      it('should add only unique VendaProduto to an array', () => {
        const vendaProdutoArray: IVendaProduto[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const vendaProdutoCollection: IVendaProduto[] = [sampleWithRequiredData];
        expectedResult = service.addVendaProdutoToCollectionIfMissing(vendaProdutoCollection, ...vendaProdutoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vendaProduto: IVendaProduto = sampleWithRequiredData;
        const vendaProduto2: IVendaProduto = sampleWithPartialData;
        expectedResult = service.addVendaProdutoToCollectionIfMissing([], vendaProduto, vendaProduto2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vendaProduto);
        expect(expectedResult).toContain(vendaProduto2);
      });

      it('should accept null and undefined values', () => {
        const vendaProduto: IVendaProduto = sampleWithRequiredData;
        expectedResult = service.addVendaProdutoToCollectionIfMissing([], null, vendaProduto, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vendaProduto);
      });

      it('should return initial array if no VendaProduto is added', () => {
        const vendaProdutoCollection: IVendaProduto[] = [sampleWithRequiredData];
        expectedResult = service.addVendaProdutoToCollectionIfMissing(vendaProdutoCollection, undefined, null);
        expect(expectedResult).toEqual(vendaProdutoCollection);
      });
    });

    describe('compareVendaProduto', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVendaProduto(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVendaProduto(entity1, entity2);
        const compareResult2 = service.compareVendaProduto(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVendaProduto(entity1, entity2);
        const compareResult2 = service.compareVendaProduto(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVendaProduto(entity1, entity2);
        const compareResult2 = service.compareVendaProduto(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
