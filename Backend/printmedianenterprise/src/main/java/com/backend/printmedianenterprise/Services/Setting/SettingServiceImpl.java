package com.backend.printmedianenterprise.Services.Setting;

import com.backend.printmedianenterprise.Dto.MasterSettingDto;
import com.backend.printmedianenterprise.Entity.MasterSetting;
import com.backend.printmedianenterprise.Repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements  SettingService {

    @Autowired
    private SettingRepository settingRepository;

    @Override
    public MasterSetting getMasterSetting(){
        return settingRepository.findById(1L).orElse(null);
    }

    @Override
    public MasterSetting updateMasterSetting(MasterSettingDto masterSettingDto){
    MasterSetting existingSetting = settingRepository.findById(1L).orElseThrow(() -> new RuntimeException("MasterSetting not found"));

        existingSetting.setProjectName(masterSettingDto.getProjectName());
        existingSetting.setAbout(masterSettingDto.getAbout());
        existingSetting.setEmail(masterSettingDto.getEmail());
        existingSetting.setPhone(masterSettingDto.getPhone());
        existingSetting.setAddress(masterSettingDto.getAddress());
        existingSetting.setFacebook(masterSettingDto.getFacebook());
        existingSetting.setTwitter(masterSettingDto.getTwitter());
        existingSetting.setInstagram(masterSettingDto.getInstagram());
        existingSetting.setWhatsapp(masterSettingDto.getWhatsapp());

        // Convert Base64 to byte array
        if (masterSettingDto.getLogoBase64() != null && !masterSettingDto.getLogoBase64().isEmpty()) {
            try {
                byte[] logoBytes = Base64.getDecoder().decode(masterSettingDto.getLogoBase64());
                existingSetting.setLogo(logoBytes);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid Base64 image data");
            }
        }
        return settingRepository.save(existingSetting);
    }
}
