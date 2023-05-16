package app.minimercado.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produto.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "produto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @NotNull
    @Column(name = "categoria", nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoriaProduto categoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
