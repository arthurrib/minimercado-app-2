package app.minimercado.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produto.
 */
@Entity
@Getter
@Setter
@Table(name = "audio_animacao")
@NoArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AudioAnimacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "peca", nullable = false)
    private String peca;

    @NotNull
    @Column(name = "cena", nullable = false)
    private String cena;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "comeca_em")
    private String comecaEm;

    @NotNull
    @Column(name = "arquivo")
    private byte[] arquivo;

    public AudioAnimacao(Long id) {
        this.id = id;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
