package com.amadProject.amadApp.post.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

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


        return responseEntity.getBody();
    }
}
