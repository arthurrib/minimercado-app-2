package app.minimercado.repository;

import app.minimercado.domain.AudioAnimacao;
import app.minimercado.domain.Produto;
import app.minimercado.domain.Relatorio;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the AudioAnimacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AudioAnimacaoRepository extends JpaRepository<AudioAnimacao, Long> {

}
