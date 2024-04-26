import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {isPresent} from 'app/core/util/operators';
import {ApplicationConfigService} from 'app/core/config/application-config.service';
import {createRequestOption} from 'app/core/request/request-util';
import {IAudioAnimacao, NewAudioAnimacao} from '../audio-animacao.model';

export type PartialUpdateAudioAnimacao = Partial<IAudioAnimacao> & Pick<IAudioAnimacao, 'id'>;

export type EntityResponseType = HttpResponse<IAudioAnimacao>;
export type EntityArrayResponseType = HttpResponse<IAudioAnimacao[]>;

@Injectable({ providedIn: 'root' })
export class AudioAnimacaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/audio-animacao');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(audioAnimacao: NewAudioAnimacao): Observable<EntityResponseType> {
    return this.http.post<IAudioAnimacao>(this.resourceUrl, audioAnimacao, { observe: 'response' });
  }

  update(audioAnimacao: IAudioAnimacao): Observable<EntityResponseType> {
    return this.http.put<IAudioAnimacao>(`${this.resourceUrl}/${this.getAudioAnimacaoIdentifier(audioAnimacao)}`, audioAnimacao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAudioAnimacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAudioAnimacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAudioAnimacaoIdentifier(audioAnimacao: Pick<IAudioAnimacao, 'id'>): number {
    return audioAnimacao.id;
  }

  compareAudioAnimacao(o1: Pick<IAudioAnimacao, 'id'> | null, o2: Pick<IAudioAnimacao, 'id'> | null): boolean {
    return o1 && o2 ? this.getAudioAnimacaoIdentifier(o1) === this.getAudioAnimacaoIdentifier(o2) : o1 === o2;
  }

  addAudioAnimacaoToCollectionIfMissing<Type extends Pick<IAudioAnimacao, 'id'>>(
    audioAnimacaoCollection: Type[],
    ...audioAnimacaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const audioAnimacaos: Type[] = audioAnimacaosToCheck.filter(isPresent);
    if (audioAnimacaos.length > 0) {
      const audioAnimacaoCollectionIdentifiers = audioAnimacaoCollection.map(audioAnimacaoItem => this.getAudioAnimacaoIdentifier(audioAnimacaoItem)!);
      const audioAnimacaosToAdd = audioAnimacaos.filter(audioAnimacaoItem => {
        const audioAnimacaoIdentifier = this.getAudioAnimacaoIdentifier(audioAnimacaoItem);
        if (audioAnimacaoCollectionIdentifiers.includes(audioAnimacaoIdentifier)) {
          return false;
        }
        audioAnimacaoCollectionIdentifiers.push(audioAnimacaoIdentifier);
        return true;
      });
      return [...audioAnimacaosToAdd, ...audioAnimacaoCollection];
    }
    return audioAnimacaoCollection;
  }
}
