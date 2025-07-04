package app.minimercado.web.rest;

import app.minimercado.domain.CategoriaProduto;
import app.minimercado.domain.Produto;
import app.minimercado.domain.Relatorio;
import app.minimercado.repository.ProdutoRepository;
import app.minimercado.service.ProdutoService;
import app.minimercado.web.rest.errors.BadRequestAlertException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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
 * REST controller for managing {@link app.minimercado.domain.Produto}.
 */
@RestController
@RequestMapping("/api")
public class ProdutoResource {

    private final Logger log = LoggerFactory.getLogger(ProdutoResource.class);

    private static final String ENTITY_NAME = "produto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProdutoService produtoService;

    private final ProdutoRepository produtoRepository;

    public ProdutoResource(ProdutoService produtoService, ProdutoRepository produtoRepository) {
        this.produtoService = produtoService;
        this.produtoRepository = produtoRepository;
    }

    /**
     * {@code POST  /produtos} : Create a new produto.
     *
     * @param produto the produto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produto, or with status {@code 400 (Bad Request)} if the produto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produtos")
    public ResponseEntity<Produto> createProduto(@Valid @RequestBody Produto produto) throws URISyntaxException {
        log.debug("REST request to save Produto : {}", produto);
        if (produto.getId() != null) {
            throw new BadRequestAlertException("A new produto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Produto result = produtoService.save(produto);
        return ResponseEntity
            .created(new URI("/api/produtos/" + result.getId()))
            .headers(CustomHeaderUtil.entityCreationAlert(applicationName, false, ENTITY_NAME, result.getNome()))
            .body(result);
    }

    /**
     * {@code PUT  /produtos/:id} : Updates an existing produto.
     *
     * @param id      the id of the produto to save.
     * @param produto the produto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produto,
     * or with status {@code 400 (Bad Request)} if the produto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produtos/{id}")
    public ResponseEntity<Produto> updateProduto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Produto produto
    ) throws URISyntaxException {
        log.debug("REST request to update Produto : {}, {}", id, produto);
        if (produto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, produto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!produtoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Produto result = produtoService.update(produto);
        return ResponseEntity
            .ok()
            .headers(CustomHeaderUtil.entityUpdateAlert(applicationName, false, ENTITY_NAME, produto.getNome()))
            .body(result);
    }

    /**
     * {@code PATCH  /produtos/:id} : Partial updates given fields of an existing produto, field will ignore if it is null
     *
     * @param id      the id of the produto to save.
     * @param produto the produto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produto,
     * or with status {@code 400 (Bad Request)} if the produto is not valid,
     * or with status {@code 404 (Not Found)} if the produto is not found,
     * or with status {@code 500 (Internal Server Error)} if the produto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/produtos/{id}", consumes = {"application/json", "application/merge-patch+json"})
    public ResponseEntity<Produto> partialUpdateProduto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Produto produto
    ) throws URISyntaxException {
        log.debug("REST request to partial update Produto partially : {}, {}", id, produto);
        if (produto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, produto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!produtoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Produto> result = produtoService.partialUpdate(produto);

        return ResponseUtil.wrapOrNotFound(
            result,
            CustomHeaderUtil.entityUpdateAlert(applicationName, false, ENTITY_NAME, produto.getNome())
        );
    }

    /**
     * {@code GET  /produtos} : get all the produtos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produtos in body.
     */
    @GetMapping("/produtos")
    public ResponseEntity<List<Produto>> getAllProdutos(@org.springdoc.api.annotations.ParameterObject Pageable pageable, @RequestParam(value = "categoria", required = false) String categoria) {
        log.debug("REST request to get a page of Produtos");
        Page<Produto> page;
        if (categoria == null) {
         page = produtoService.findAll(pageable);
        } else {
            page = produtoService.findByCategoria(CategoriaProduto.valueOf(categoria), pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    @GetMapping("/produtos/list-categories")
    public ResponseEntity<List<String>> getAvailableProdutos() {
        log.debug("REST request to get a page of Produtos");
        List<String> result = produtoService.listCategories();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/produtos/list-all-categories")
    public ResponseEntity<List<String>> getAllProdutos() {
        log.debug("REST request to get a page of Produtos");
        List<String> result = Stream.of(CategoriaProduto.values()).map(Enum::name).collect(Collectors.toList());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/relatorios")
    public ResponseEntity<List<Relatorio>> getRelatorio() {
        log.debug("REST request to get a page of Relatorio");
        List<Relatorio> page = produtoService.findAllRelatorio();
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().body(page);
    }

    /**
     * {@code GET  /produtos/:id} : get the "id" produto.
     *
     * @param id the id of the produto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produtos/{id}")
    public ResponseEntity<Produto> getProduto(@PathVariable Long id) {
        log.debug("REST request to get Produto : {}", id);
        Optional<Produto> produto = produtoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(produto);
    }

    /**
     * {@code DELETE  /produtos/:id} : delete the "id" produto.
     *
     * @param id the id of the produto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        log.debug("REST request to delete Produto : {}", id);
        produtoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(CustomHeaderUtil.entityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
