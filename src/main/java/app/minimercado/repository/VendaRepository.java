package app.minimercado.repository;

import app.minimercado.domain.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Spring Data JPA repository for the Venda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
    Page<Venda> findAllByConta_Id(Long idConta, Pageable pageable);
    List<Venda> findAllByConta_Id(Long idConta);

    @Query("SELECT n FROM Venda n WHERE (:conta is null OR lower(n.conta.nome) like :conta)")
    Page<Venda> findAllFilterConta(@Param("conta") String filterConta, Pageable pageable);

}
