package app.minimercado.service;

import app.minimercado.domain.VendaProduto;
import app.minimercado.repository.VendaProdutoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link VendaProduto}.
 */
@Service
@Transactional
public class VendaProdutoService {

    private final Logger log = LoggerFactory.getLogger(VendaProdutoService.class);

    private final VendaProdutoRepository vendaProdutoRepository;

    public VendaProdutoService(VendaProdutoRepository vendaProdutoRepository) {
        this.vendaProdutoRepository = vendaProdutoRepository;
    }

    /**
     * Save a vendaProduto.
     *
     * @param vendaProduto the entity to save.
     * @return the persisted entity.
     */
    public VendaProduto save(VendaProduto vendaProduto) {
        log.debug("Request to save VendaProduto : {}", vendaProduto);
        return vendaProdutoRepository.save(vendaProduto);
    }

    /**
     * Update a vendaProduto.
     *
     * @param vendaProduto the entity to save.
     * @return the persisted entity.
     */
    public VendaProduto update(VendaProduto vendaProduto) {
        log.debug("Request to update VendaProduto : {}", vendaProduto);
        return vendaProdutoRepository.save(vendaProduto);
    }

    /**
     * Partially update a vendaProduto.
     *
     * @param vendaProduto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<VendaProduto> partialUpdate(VendaProduto vendaProduto) {
        log.debug("Request to partially update VendaProduto : {}", vendaProduto);

        return vendaProdutoRepository
            .findById(vendaProduto.getId())
            .map(existingVendaProduto -> {
                if (vendaProduto.getQtd() != null) {
                    existingVendaProduto.setQtd(vendaProduto.getQtd());
                }
                if (vendaProduto.getValorUnitario() != null) {
                    existingVendaProduto.setValorUnitario(vendaProduto.getValorUnitario());
                }
                if (vendaProduto.getDesconto() != null) {
                    existingVendaProduto.setDesconto(vendaProduto.getDesconto());
                }

                return existingVendaProduto;
            })
            .map(vendaProdutoRepository::save);
    }

    /**
     * Get all the vendaProdutos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<VendaProduto> findAll() {
        log.debug("Request to get all VendaProdutos");
        return vendaProdutoRepository.findAll();
    }

    /**
     * Get one vendaProduto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VendaProduto> findOne(Long id) {
        log.debug("Request to get VendaProduto : {}", id);
        return vendaProdutoRepository.findById(id);
    }

    /**
     * Delete the vendaProduto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete VendaProduto : {}", id);
        vendaProdutoRepository.deleteById(id);
    }
}
