package app.minimercado.web.rest;

import app.minimercado.domain.VendaProduto;
import app.minimercado.repository.VendaProdutoRepository;
import app.minimercado.service.VendaProdutoService;
import app.minimercado.web.rest.errors.BadRequestAlertException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link app.minimercado.domain.VendaProduto}.
 */
@RestController
@RequestMapping("/api")
public class VendaProdutoResource {

    private final Logger log = LoggerFactory.getLogger(VendaProdutoResource.class);

    private static final String ENTITY_NAME = "vendaProduto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VendaProdutoService vendaProdutoService;

    private final VendaProdutoRepository vendaProdutoRepository;

    public VendaProdutoResource(VendaProdutoService vendaProdutoService, VendaProdutoRepository vendaProdutoRepository) {
        this.vendaProdutoService = vendaProdutoService;
        this.vendaProdutoRepository = vendaProdutoRepository;
    }

    /**
     * {@code POST  /venda-produtos} : Create a new vendaProduto.
     *
     * @param vendaProduto the vendaProduto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vendaProduto, or with status {@code 400 (Bad Request)} if the vendaProduto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/venda-produtos")
    public ResponseEntity<VendaProduto> createVendaProduto(@Valid @RequestBody VendaProduto vendaProduto) throws URISyntaxException {
        log.debug("REST request to save VendaProduto : {}", vendaProduto);
        if (vendaProduto.getId() != null) {
            throw new BadRequestAlertException("A new vendaProduto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VendaProduto result = vendaProdutoService.save(vendaProduto);
        return ResponseEntity
            .created(new URI("/api/venda-produtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /venda-produtos/:id} : Updates an existing vendaProduto.
     *
     * @param id           the id of the vendaProduto to save.
     * @param vendaProduto the vendaProduto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vendaProduto,
     * or with status {@code 400 (Bad Request)} if the vendaProduto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vendaProduto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/venda-produtos/{id}")
    public ResponseEntity<VendaProduto> updateVendaProduto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody VendaProduto vendaProduto
    ) throws URISyntaxException {
        log.debug("REST request to update VendaProduto : {}, {}", id, vendaProduto);
        if (vendaProduto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vendaProduto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vendaProdutoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VendaProduto result = vendaProdutoService.update(vendaProduto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vendaProduto.getId().toString()))
            .body(result);
    }

    @PutMapping("/venda-produtos/update-all")
    public ResponseEntity<List<VendaProduto>> updateAll(@Valid @RequestBody List<VendaProduto> vendaProdutos) throws URISyntaxException {
        List<VendaProduto> result = new ArrayList<>();
        vendaProdutos.forEach(vp -> result.add(vendaProdutoService.save(vp)));

        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vendaProdutos.get(0).getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /venda-produtos/:id} : Partial updates given fields of an existing vendaProduto, field will ignore if it is null
     *
     * @param id           the id of the vendaProduto to save.
     * @param vendaProduto the vendaProduto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vendaProduto,
     * or with status {@code 400 (Bad Request)} if the vendaProduto is not valid,
     * or with status {@code 404 (Not Found)} if the vendaProduto is not found,
     * or with status {@code 500 (Internal Server Error)} if the vendaProduto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/venda-produtos/{id}", consumes = {"application/json", "application/merge-patch+json"})
    public ResponseEntity<VendaProduto> partialUpdateVendaProduto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody VendaProduto vendaProduto
    ) throws URISyntaxException {
        log.debug("REST request to partial update VendaProduto partially : {}, {}", id, vendaProduto);
        if (vendaProduto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vendaProduto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vendaProdutoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VendaProduto> result = vendaProdutoService.partialUpdate(vendaProduto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vendaProduto.getId().toString())
        );
    }

    /**
     * {@code GET  /venda-produtos} : get all the vendaProdutos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vendaProdutos in body.
     */
    @GetMapping("/venda-produtos")
    public List<VendaProduto> getAllVendaProdutos() {
        log.debug("REST request to get all VendaProdutos");
        return vendaProdutoService.findAll();
    }

    @GetMapping("/venda-produtos/venda/{idVenda}")
    public List<VendaProduto> getAllVendaProdutos(@PathVariable("idVenda") Long idVenda) {
        log.debug("REST request to get all VendaProdutos");
        return vendaProdutoService.findAllByVenda(idVenda);
    }

    /**
     * {@code GET  /venda-produtos/:id} : get the "id" vendaProduto.
     *
     * @param id the id of the vendaProduto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vendaProduto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/venda-produtos/{id}")
    public ResponseEntity<VendaProduto> getVendaProduto(@PathVariable Long id) {
        log.debug("REST request to get VendaProduto : {}", id);
        Optional<VendaProduto> vendaProduto = vendaProdutoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vendaProduto);
    }

    /**
     * {@code DELETE  /venda-produtos/:id} : delete the "id" vendaProduto.
     *
     * @param id the id of the vendaProduto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/venda-produtos/{id}")
    public ResponseEntity<Void> deleteVendaProduto(@PathVariable Long id) {
        log.debug("REST request to delete VendaProduto : {}", id);
        vendaProdutoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
