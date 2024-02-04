package com.amadProject.amadApp.domain.amad.mapper;

import com.amadProject.amadApp.domain.amad.dto.AmadDto;
import com.amadProject.amadApp.domain.amad.entity.Amad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AmadMapper {

     Amad postToAmad(AmadDto.Post post);
     Amad patchToAmad(AmadDto.Patch patch);
     AmadDto.Response amadToResponse(Amad amad);
}
