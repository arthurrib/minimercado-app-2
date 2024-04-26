package app.minimercado.repository;

import app.minimercado.domain.Produto;
import app.minimercado.domain.Relatorio;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Produto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query(value = "SELECT p.nome as produtoNome, sum(vp.qtd) as quantidadeVendida, sum(vp.qtd * vp.valor_unitario) as totalVendido FROM produto p " +
        "LEFT JOIN venda_produto vp ON p.id = vp.id_produto group by p.nome", nativeQuery = true)
    List<Object[]> findRelatorio();

    @Query("select distinct p.categoria from Produto p order by p.categoria asc")
    List<String> listCategories();
}
