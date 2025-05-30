package app.minimercado.service;

import app.minimercado.domain.CategoriaProduto;
import app.minimercado.domain.Produto;
import app.minimercado.domain.Relatorio;
import app.minimercado.repository.ProdutoRepository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Produto}.
 */
@Service
@Transactional
public class ProdutoService {

    private final Logger log = LoggerFactory.getLogger(ProdutoService.class);

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    /**
     * Save a produto.
     *
     * @param produto the entity to save.
     * @return the persisted entity.
     */
    public Produto save(Produto produto) {
        log.debug("Request to save Produto : {}", produto);
        return produtoRepository.save(produto);
    }

    /**
     * Update a produto.
     *
     * @param produto the entity to save.
     * @return the persisted entity.
     */
    public Produto update(Produto produto) {
        log.debug("Request to update Produto : {}", produto);
        return produtoRepository.save(produto);
    }

    /**
     * Partially update a produto.
     *
     * @param produto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Produto> partialUpdate(Produto produto) {
        log.debug("Request to partially update Produto : {}", produto);

        return produtoRepository
            .findById(produto.getId())
            .map(existingProduto -> {
                if (produto.getNome() != null) {
                    existingProduto.setNome(produto.getNome());
                }
                if (produto.getValor() != null) {
                    existingProduto.setValor(produto.getValor());
                }
                if (produto.getCategoria() != null) {
                    existingProduto.setCategoria(produto.getCategoria());
                }

                return existingProduto;
            })
            .map(produtoRepository::save);
    }

    /**
     * Get all the produtos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Produto> findAll(Pageable pageable) {
        log.debug("Request to get all Produtos");
        return produtoRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Produto> findByCategoria(CategoriaProduto categoria, Pageable pageable) {
        log.debug("Request to get all Produtos");
        return produtoRepository.findAllByCategoria(categoria, pageable);
    }

    /**
     * Get one produto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Produto> findOne(Long id) {
        log.debug("Request to get Produto : {}", id);
        return produtoRepository.findById(id);
    }

    /**
     * Delete the produto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Produto : {}", id);
        produtoRepository.deleteById(id);
    }

    public List<Relatorio> findAllRelatorio() {
        List<Object[]> result = produtoRepository.findRelatorio();
        return result.stream().map(r -> new Relatorio((String) r[0], (BigInteger) r[1], (BigDecimal) r[2])).collect(Collectors.toList());
    }

    public List<String> listCategories() {
        return produtoRepository.listCategories();
    }
}
