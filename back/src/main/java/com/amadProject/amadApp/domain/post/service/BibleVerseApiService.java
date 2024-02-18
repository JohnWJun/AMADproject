package com.amadProject.amadApp.domain.post.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.net.URI;
import java.util.Objects;

@Service
public class BibleVerseApiService {

    public String getBible(String bible, String chapter, String from, String to){
        URI uri = UriComponentsBuilder
                .fromUriString("http://ibibles.net/quote.php")
                .query("kor-"+bible+"/"+chapter+":"+from+"-"+to)
                .encode()
                .build(true)
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);
        Document doc = Jsoup.parse(Objects.requireNonNull(responseEntity.getBody()));

        return doc.body().text();
    }
}
