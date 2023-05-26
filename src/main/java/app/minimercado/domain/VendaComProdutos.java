package app.minimercado.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class VendaComProdutos {
    private Long id;
    private String observacoes;
    private Conta conta;
    private ZonedDateTime createdDate;
    private List<VendaProduto> produtos;

    public VendaComProdutos(Venda venda, List<VendaProduto> produtos) {
        this.id = venda.getId();
        this.observacoes = venda.getObservacoes();
        this.conta = venda.getConta();
        this.createdDate = venda.getCreatedDate().atZone(ZoneId.of("America/Sao_Paulo"));
        this.produtos = produtos;
    }
}
