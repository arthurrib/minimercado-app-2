package app.minimercado.web.rest;

import app.minimercado.domain.Estoque;
import app.minimercado.repository.EstoqueRepository;
import app.minimercado.service.EstoqueService;
import app.minimercado.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link app.minimercado.domain.Estoque}.
 */
@RestController
@RequestMapping("/api")
public class EstoqueResource {

    private final Logger log = LoggerFactory.getLogger(EstoqueResource.class);

    private static final String ENTITY_NAME = "estoque";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstoqueService estoqueService;

    private final EstoqueRepository estoqueRepository;

    public EstoqueResource(EstoqueService estoqueService, EstoqueRepository estoqueRepository) {
        this.estoqueService = estoqueService;
        this.estoqueRepository = estoqueRepository;
    }

    /**
     * {@code POST  /estoques} : Create a new estoque.
     *
     * @param estoque the estoque to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estoque, or with status {@code 400 (Bad Request)} if the estoque has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estoques")
    public ResponseEntity<Estoque> createEstoque(@Valid @RequestBody Estoque estoque) throws URISyntaxException {
        log.debug("REST request to save Estoque : {}", estoque);
        if (estoque.getId() != null) {
            throw new BadRequestAlertException("A new estoque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estoque result = estoqueService.save(estoque);
        return ResponseEntity
            .created(new URI("/api/estoques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estoques/:id} : Updates an existing estoque.
     *
     * @param id the id of the estoque to save.
     * @param estoque the estoque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estoque,
     * or with status {@code 400 (Bad Request)} if the estoque is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estoque couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estoques/{id}")
    public ResponseEntity<Estoque> updateEstoque(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Estoque estoque
    ) throws URISyntaxException {
        log.debug("REST request to update Estoque : {}, {}", id, estoque);
        if (estoque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estoque.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estoqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Estoque result = estoqueService.update(estoque);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estoque.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estoques/:id} : Partial updates given fields of an existing estoque, field will ignore if it is null
     *
     * @param id the id of the estoque to save.
     * @param estoque the estoque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estoque,
     * or with status {@code 400 (Bad Request)} if the estoque is not valid,
     * or with status {@code 404 (Not Found)} if the estoque is not found,
     * or with status {@code 500 (Internal Server Error)} if the estoque couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estoques/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Estoque> partialUpdateEstoque(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Estoque estoque
    ) throws URISyntaxException {
        log.debug("REST request to partial update Estoque partially : {}, {}", id, estoque);
        if (estoque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estoque.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estoqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Estoque> result = estoqueService.partialUpdate(estoque);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estoque.getId().toString())
        );
    }

    /**
     * {@code GET  /estoques} : get all the estoques.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estoques in body.
     */
    @GetMapping("/estoques")
    public ResponseEntity<List<Estoque>> getAllEstoques(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Estoques");
        Page<Estoque> page = estoqueService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /estoques/:id} : get the "id" estoque.
     *
     * @param id the id of the estoque to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estoque, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estoques/{id}")
    public ResponseEntity<Estoque> getEstoque(@PathVariable Long id) {
        log.debug("REST request to get Estoque : {}", id);
        Optional<Estoque> estoque = estoqueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estoque);
    }

    /**
     * {@code DELETE  /estoques/:id} : delete the "id" estoque.
     *
     * @param id the id of the estoque to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estoques/{id}")
    public ResponseEntity<Void> deleteEstoque(@PathVariable Long id) {
        log.debug("REST request to delete Estoque : {}", id);
        estoqueService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
