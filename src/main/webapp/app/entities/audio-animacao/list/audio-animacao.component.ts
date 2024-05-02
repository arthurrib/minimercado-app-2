import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {combineLatest, filter, Observable, switchMap, tap} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IAudioAnimacao} from '../audio-animacao.model';

import {ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER} from 'app/config/pagination.constants';
import {ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA} from 'app/config/navigation.constants';
import {EntityArrayResponseType, AudioAnimacaoService} from '../service/audio-animacao.service';
import {AudioAnimacaoDeleteDialogComponent} from '../delete/audio-animacao-delete-dialog.component';

@Component({
  selector: 'jhi-audioAnimacao',
  templateUrl: './audio-animacao.component.html',
})
export class AudioAnimacaoComponent implements OnInit {
  audioAnimacaos?: IAudioAnimacao[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;


  //CRACHA
  cracha = [
    {
      audio: new Audio("../../../../content/audio/CRACHA/1.cruzeiro do neymar (recorte).mp3"),
      status: 'stop',
      name: '1.cruzeiro do neymar (recorte)'
    },
    {
      audio: new Audio("../../../../content/audio/CRACHA/2-pipoco-ana castela.mp3"),
      status: 'stop',
      name: '2-pipoco-ana castela'
    },
    {
      audio: new Audio("../../../../content/audio/CRACHA/3-fronteira -infiltrado.mp3"),
      status: 'stop',
      name: '3-fronteira -infiltrado'
    },
    {
      audio: new Audio("../../../../content/audio/CRACHA/4-so tem eu (recorte).m4a"),
      status: 'stop',
      name: '4-so tem eu (recorte)'
    },
    {
      audio: new Audio("../../../../content/audio/CRACHA/5-malu borges.mp3"),
      status: 'stop',
      name: '5-malu borges'
    },
    {
      audio: new Audio("../../../../content/audio/CRACHA/6-branquelas.mp3"),
      status: 'stop',
      name: '6-branquelas'
    },
    {
      audio: new Audio("../../../../content/audio/CRACHA/7-thousand miles-infiltrado.mp3"),
      status: 'stop',
      name: '7-thousand miles-infiltrado'
    }
  ]

  // LIFEHOUSE
  lifehouse = {
    audio: new Audio("../../../../content/audio/LIFEHOUSE/Lifehouse - Everything.mp3"),
    status: 'stop',
    name: 'Lifehouse - Everything'
  };

  // CASTIDADE
  castidade = [
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/1-A Internet e Toxica.mp3"),
      status: 'stop',
      name: '1-A Internet e Toxica'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/2. praise jah in the moonlight.mp3"),
      status: 'stop',
      name: '2. praise jah in the moonlight'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/3-deixa acontecer.mp3"),
      status: 'stop',
      name: '3-deixa acontecer'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/4.ra chum.mp3"),
      status: 'stop',
      name: '4.ra chum'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/5. the avengers.mp3"),
      status: 'stop',
      name: '5. the avengers'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/6-MEDUZA - Lose Control.mp3"),
      status: 'stop',
      name: '6-MEDUZA - Lose Control'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/7-Perai-carrossel.mp3"),
      status: 'stop',
      name: '7-Perai-carrossel'
    },
    {
      audio: new Audio("../../../../content/audio/CASTIDADE/8- oracao.mp4"),
      status: 'stop',
      name: '8- oracao'
    }
  ];
  // ALMOCO
  almoco =  {
    audio: new Audio("../../../../content/audio/ALMOCO/hsm_work_this_out.mp3"),
    status: 'stop',
    name: 'hsm_work_this_out'
  };


  constructor(
    protected audioAnimacaoService: AudioAnimacaoService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {
  }

  trackId = (_index: number, item: IAudioAnimacao): number => this.audioAnimacaoService.getAudioAnimacaoIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  delete(audioAnimacao: IAudioAnimacao): void {
    const modalRef = this.modalService.open(AudioAnimacaoDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.audioAnimacao = audioAnimacao;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.audioAnimacaos = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: IAudioAnimacao[] | null): IAudioAnimacao[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(page?: number, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.audioAnimacaoService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
