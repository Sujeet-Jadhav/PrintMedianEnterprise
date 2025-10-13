package com.backend.printmedianenterprise.Controller;

import com.backend.printmedianenterprise.Dto.MasterSettingDto;
import com.backend.printmedianenterprise.Entity.MasterSetting;
import com.backend.printmedianenterprise.Services.Setting.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/setting")
@RequiredArgsConstructor
public class SettingController {

    private final SettingService settingService;

    @GetMapping("/master_setting")
    public ResponseEntity<MasterSetting> getMasterSetting(){
        MasterSetting masterSetting = settingService.getMasterSetting();
        return ResponseEntity.ok(masterSetting);
    }

    @PutMapping("/update_setting")
    public ResponseEntity<MasterSetting> updateMasterSetting(@RequestBody MasterSettingDto masterSettingDto){
        MasterSetting updatedSetting = settingService.updateMasterSetting(masterSettingDto);
        return ResponseEntity.ok(updatedSetting);
    }
}
