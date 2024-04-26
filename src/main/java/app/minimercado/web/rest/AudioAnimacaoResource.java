package app.minimercado.web.rest;

import app.minimercado.domain.AudioAnimacao;
import app.minimercado.repository.AudioAnimacaoRepository;
import app.minimercado.service.AudioAnimacaoService;
import app.minimercado.web.rest.errors.BadRequestAlertException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * REST controller for managing {@link app.minimercado.domain.AudioAnimacao}.
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AudioAnimacaoResource {

    private final Logger log = LoggerFactory.getLogger(AudioAnimacaoResource.class);

    private static final String ENTITY_NAME = "audioAnimacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AudioAnimacaoService audioAnimacaoService;

    private final AudioAnimacaoRepository audioAnimacaoRepository;

    @PostMapping("/audio-animacao")
    public ResponseEntity<AudioAnimacao> createAudioAnimacao(@Valid @RequestBody AudioAnimacao audioAnimacao) throws URISyntaxException {
        log.debug("REST request to save AudioAnimacao : {}", audioAnimacao);
        if (audioAnimacao.getId() != null) {
            throw new BadRequestAlertException("A new audioAnimacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AudioAnimacao result = audioAnimacaoService.save(audioAnimacao);
        return ResponseEntity
            .created(new URI("/api/audio-animacao/" + result.getId()))
            .headers(CustomHeaderUtil.entityCreationAlert(applicationName, false, ENTITY_NAME, result.getPeca()))
            .body(result);
    }

    @PutMapping("/audio-animacao/{id}")
    public ResponseEntity<AudioAnimacao> updateAudioAnimacao(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AudioAnimacao audioAnimacao
    ) throws URISyntaxException {
        log.debug("REST request to update AudioAnimacao : {}, {}", id, audioAnimacao);
        if (audioAnimacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, audioAnimacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!audioAnimacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AudioAnimacao result = audioAnimacaoService.update(audioAnimacao);
        return ResponseEntity
            .ok()
            .headers(CustomHeaderUtil.entityUpdateAlert(applicationName, false, ENTITY_NAME, audioAnimacao.getPeca()))
            .body(result);
    }

    @PatchMapping(value = "/audio-animacao/{id}", consumes = {"application/json", "application/merge-patch+json"})
    public ResponseEntity<AudioAnimacao> partialUpdateAudioAnimacao(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AudioAnimacao audioAnimacao
    ) throws URISyntaxException {
        log.debug("REST request to partial update AudioAnimacao partially : {}, {}", id, audioAnimacao);
        if (audioAnimacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, audioAnimacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!audioAnimacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AudioAnimacao> result = audioAnimacaoService.partialUpdate(audioAnimacao);

        return ResponseUtil.wrapOrNotFound(
            result,
            CustomHeaderUtil.entityUpdateAlert(applicationName, false, ENTITY_NAME, audioAnimacao.getPeca())
        );
    }

    @GetMapping("/audio-animacao")
    public ResponseEntity<List<AudioAnimacao>> getAllAudioAnimacaos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of AudioAnimacaos");
        Page<AudioAnimacao> page = audioAnimacaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/audio-animacao/{id}")
    public ResponseEntity<AudioAnimacao> getAudioAnimacao(@PathVariable Long id) {
        log.debug("REST request to get AudioAnimacao : {}", id);
        Optional<AudioAnimacao> audioAnimacao = audioAnimacaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(audioAnimacao);
    }

    @DeleteMapping("/audio-animacao/{id}")
    public ResponseEntity<Void> deleteAudioAnimacao(@PathVariable Long id) {
        log.debug("REST request to delete AudioAnimacao : {}", id);
        audioAnimacaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(CustomHeaderUtil.entityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
