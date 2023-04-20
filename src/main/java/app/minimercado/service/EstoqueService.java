package app.minimercado.service;

import app.minimercado.domain.Estoque;
import app.minimercado.repository.EstoqueRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Estoque}.
 */
@Service
@Transactional
public class EstoqueService {

    private final Logger log = LoggerFactory.getLogger(EstoqueService.class);

    private final EstoqueRepository estoqueRepository;

    public EstoqueService(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }

    /**
     * Save a estoque.
     *
     * @param estoque the entity to save.
     * @return the persisted entity.
     */
    public Estoque save(Estoque estoque) {
        log.debug("Request to save Estoque : {}", estoque);
        return estoqueRepository.save(estoque);
    }

    /**
     * Update a estoque.
     *
     * @param estoque the entity to save.
     * @return the persisted entity.
     */
    public Estoque update(Estoque estoque) {
        log.debug("Request to update Estoque : {}", estoque);
        return estoqueRepository.save(estoque);
    }

    /**
     * Partially update a estoque.
     *
     * @param estoque the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Estoque> partialUpdate(Estoque estoque) {
        log.debug("Request to partially update Estoque : {}", estoque);

        return estoqueRepository
            .findById(estoque.getId())
            .map(existingEstoque -> {
                if (estoque.getQtd() != null) {
                    existingEstoque.setQtd(estoque.getQtd());
                }
                if (estoque.getValor() != null) {
                    existingEstoque.setValor(estoque.getValor());
                }

                return existingEstoque;
            })
            .map(estoqueRepository::save);
    }

    /**
     * Get all the estoques.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Estoque> findAll(Pageable pageable) {
        log.debug("Request to get all Estoques");
        return estoqueRepository.findAll(pageable);
    }

    /**
     * Get one estoque by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Estoque> findOne(Long id) {
        log.debug("Request to get Estoque : {}", id);
        return estoqueRepository.findById(id);
    }

    /**
     * Delete the estoque by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Estoque : {}", id);
        estoqueRepository.deleteById(id);
    }
}
