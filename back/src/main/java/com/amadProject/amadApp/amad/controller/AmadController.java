package com.amadProject.amadApp.amad.controller;

import com.amadProject.amadApp.amad.dto.AmadDto;
import com.amadProject.amadApp.amad.entity.Amad;
import com.amadProject.amadApp.amad.mapper.AmadMapper;
import com.amadProject.amadApp.amad.service.AmadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/amad")
@Validated
@Slf4j
@RequiredArgsConstructor
public class AmadController {

    private final AmadMapper mapper;
    private final AmadService service;
    @PostMapping("/{post-id}")
    public ResponseEntity postAmad(@RequestBody AmadDto.Post post,
                                   @PathVariable("post-id") long postId){

        Amad amad = mapper.postToAmad(post);
        AmadDto.Response response = mapper.amadToResponse(service.createAmad(amad,postId));

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PatchMapping("/{amad-id}")
    public ResponseEntity patchAmad(@RequestBody AmadDto.Patch patch,
                                    @PathVariable("amad-id") long amadId){

        Amad amad = mapper.patchToAmad(patch);
        AmadDto.Response response = mapper.amadToResponse(service.updateAmad(amad,amadId));

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/{amad-id}")
    public ResponseEntity getAmad(@PathVariable("amad-id") long amadId){
        AmadDto.Response response = mapper.amadToResponse(service.findAmad(amadId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{amad-id}")
    public ResponseEntity deleteAmad(@PathVariable("amad-id") long amadId){
        service.deleteAmad(amadId);
        return new ResponseEntity<>("AMAD is deleted",HttpStatus.NO_CONTENT);
    }

}
