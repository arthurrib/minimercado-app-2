package app.minimercado.service;

import app.minimercado.domain.Conta;
import app.minimercado.repository.ContaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Conta}.
 */
@Service
@Transactional
public class ContaService {

    private final Logger log = LoggerFactory.getLogger(ContaService.class);

    private final ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    /**
     * Save a conta.
     *
     * @param conta the entity to save.
     * @return the persisted entity.
     */
    public Conta save(Conta conta) {
        log.debug("Request to save Conta : {}", conta);
        return contaRepository.save(conta);
    }

    /**
     * Update a conta.
     *
     * @param conta the entity to save.
     * @return the persisted entity.
     */
    public Conta update(Conta conta) {
        log.debug("Request to update Conta : {}", conta);
        return contaRepository.save(conta);
    }

    /**
     * Partially update a conta.
     *
     * @param conta the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Conta> partialUpdate(Conta conta) {
        log.debug("Request to partially update Conta : {}", conta);

        return contaRepository
            .findById(conta.getId())
            .map(existingConta -> {
                if (conta.getNome() != null) {
                    existingConta.setNome(conta.getNome());
                }
                if (conta.getTelefone() != null) {
                    existingConta.setTelefone(conta.getTelefone());
                }
                if (conta.getEquipe() != null) {
                    existingConta.setEquipe(conta.getEquipe());
                }
                if (conta.getStatus() != null) {
                    existingConta.setStatus(conta.getStatus());
                }

                return existingConta;
            })
            .map(contaRepository::save);
    }

    /**
     * Get all the contas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Conta> findAll(Pageable pageable) {
        log.debug("Request to get all Contas");
        return contaRepository.findAll(pageable);
    }

    /**
     * Get one conta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Conta> findOne(Long id) {
        log.debug("Request to get Conta : {}", id);
        return contaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Conta> findOneByTelefone(String telefone) {
        return contaRepository.findByTelefone(telefone);
    }

    /**
     * Delete the conta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Conta : {}", id);
        contaRepository.deleteById(id);
    }
}
