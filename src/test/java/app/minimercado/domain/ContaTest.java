package app.minimercado.domain;

import static org.assertj.core.api.Assertions.assertThat;

import app.minimercado.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conta.class);
        Conta conta1 = new Conta();
        conta1.setId(1L);
        Conta conta2 = new Conta();
        conta2.setId(conta1.getId());
        assertThat(conta1).isEqualTo(conta2);
        conta2.setId(2L);
        assertThat(conta1).isNotEqualTo(conta2);
        conta1.setId(null);
        assertThat(conta1).isNotEqualTo(conta2);
    }
}
