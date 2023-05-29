package app.minimercado.service;

import app.minimercado.domain.Venda;
import app.minimercado.domain.VendaComProdutos;
import app.minimercado.repository.VendaProdutoRepository;
import app.minimercado.repository.VendaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Venda}.
 */
@Service
@Transactional
public class VendaService {

    private final Logger log = LoggerFactory.getLogger(VendaService.class);

    private final VendaRepository vendaRepository;
    private final VendaProdutoRepository vendaProdutoRepository;


    public VendaService(VendaRepository vendaRepository,VendaProdutoRepository vendaProdutoRepository) {
        this.vendaRepository = vendaRepository;
        this.vendaProdutoRepository = vendaProdutoRepository;
    }

    /**
     * Save a venda.
     *
     * @param venda the entity to save.
     * @return the persisted entity.
     */
    public Venda save(Venda venda) {
        log.debug("Request to save Venda : {}", venda);
        return vendaRepository.save(venda);
    }

    /**
     * Update a venda.
     *
     * @param venda the entity to save.
     * @return the persisted entity.
     */
    public Venda update(Venda venda) {
        log.debug("Request to update Venda : {}", venda);
        return vendaRepository.save(venda);
    }

    /**
     * Partially update a venda.
     *
     * @param venda the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Venda> partialUpdate(Venda venda) {
        log.debug("Request to partially update Venda : {}", venda);

        return vendaRepository
            .findById(venda.getId())
//            .map(existingVenda -> {
//                if (venda.getData() != null) {
//                    existingVenda.setData(venda.getData());
//                }
//                if (venda.getStatus() != null) {
//                    existingVenda.setStatus(venda.getStatus());
//                }

//                return existingVenda;
//            })
            .map(vendaRepository::save);
    }

    /**
     * Get all the vendas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Venda> findAll(String filterConta, Pageable pageable) {
        log.debug("Request to get all Vendas");
        if (filterConta != null) {
            filterConta = String.format("%%%s%%", filterConta);
        }
        return vendaRepository.findAllFilterConta(filterConta, pageable);
    }

    @Transactional(readOnly = true)
    public List<VendaComProdutos> findAllByConta(Long idConta, Pageable pageable) {
        Page<Venda> vendas =  vendaRepository.findAllByConta_Id(idConta,pageable);
        List<VendaComProdutos> result = new ArrayList<>();
        vendas.getContent().forEach(v ->result.add(new VendaComProdutos(v, vendaProdutoRepository.findAllByVenda_Id(v.getId()))));
        return result;
    }

    /**
     * Get one venda by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Venda> findOne(Long id) {
        log.debug("Request to get Venda : {}", id);
        return vendaRepository.findById(id);
    }

    /**
     * Delete the venda by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Venda : {}", id);
        vendaRepository.deleteById(id);
    }


}
