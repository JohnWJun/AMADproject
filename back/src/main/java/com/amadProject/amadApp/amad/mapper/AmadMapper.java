package com.amadProject.amadApp.amad.mapper;

import com.amadProject.amadApp.amad.dto.AmadDto;
import com.amadProject.amadApp.amad.entity.Amad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AmadMapper {

     Amad postToAmad(AmadDto.Post post);
     Amad patchToAmad(AmadDto.Patch patch);
     AmadDto.Response amadToResponse(Amad amad);
}
