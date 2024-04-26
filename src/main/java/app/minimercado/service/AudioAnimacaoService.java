package app.minimercado.service;

import app.minimercado.domain.AudioAnimacao;
import app.minimercado.domain.Relatorio;
import app.minimercado.repository.AudioAnimacaoRepository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AudioAnimacao}.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class AudioAnimacaoService {

    private final Logger log = LoggerFactory.getLogger(AudioAnimacaoService.class);

    private final AudioAnimacaoRepository audioAnimacaoRepository;

    public AudioAnimacao save(AudioAnimacao audioAnimacao) {
        log.debug("Request to save AudioAnimacao : {}", audioAnimacao);
        return audioAnimacaoRepository.save(audioAnimacao);
    }

    public AudioAnimacao update(AudioAnimacao audioAnimacao) {
        log.debug("Request to update AudioAnimacao : {}", audioAnimacao);
        return audioAnimacaoRepository.save(audioAnimacao);
    }

    public Optional<AudioAnimacao> partialUpdate(AudioAnimacao audioAnimacao) {
        log.debug("Request to partially update AudioAnimacao : {}", audioAnimacao);

        return audioAnimacaoRepository
            .findById(audioAnimacao.getId())
            .map(existingAudioAnimacao -> {

                return existingAudioAnimacao;
            })
            .map(audioAnimacaoRepository::save);
    }

    @Transactional(readOnly = true)
    public Page<AudioAnimacao> findAll(Pageable pageable) {
        log.debug("Request to get all AudioAnimacaos");
        return audioAnimacaoRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<AudioAnimacao> findOne(Long id) {
        log.debug("Request to get AudioAnimacao : {}", id);
        return audioAnimacaoRepository.findById(id);
    }

    public void delete(Long id) {
        log.debug("Request to delete AudioAnimacao : {}", id);
        audioAnimacaoRepository.deleteById(id);
    }
}
