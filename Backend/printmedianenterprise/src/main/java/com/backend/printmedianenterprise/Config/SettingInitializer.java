package com.backend.printmedianenterprise.Config;

import com.backend.printmedianenterprise.Entity.MasterSetting;
import com.backend.printmedianenterprise.Repository.SettingRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SettingInitializer {

    private final SettingRepository settingRepository;

    @PostConstruct
    public void initializeSetting(){
        if(settingRepository.count() == 0){
            MasterSetting defaultSetting = new MasterSetting();
            defaultSetting.setProjectName("Print Median Enterprise");
            defaultSetting.setAbout("At Print Median Enterprises, we're passionate about the power of print. For 14 years, we've been dedicated to providing high-quality printing solutions tailored to our clients' needs. From business cards to banners, we've got you covered.");
            defaultSetting.setEmail("printnmedian@gmail.com");
            defaultSetting.setPhone("+8379050075");
            defaultSetting.setAddress("Shop No. 508, Omkar Apartments, Chowk, Pate - Sampada, Mehunpura, Shaniwar Peth, Pune, Maharashtra 411030");
            defaultSetting.setFacebook("https://www.facebook.com/printmedian");
            defaultSetting.setTwitter("https://twitter.com/printmedian");
            defaultSetting.setInstagram("https://www.instagram.com/printmedian/");
            defaultSetting.setWhatsapp("https://wa.me/8379050075");
            settingRepository.save(defaultSetting);
            log.info("Default MasterSetting initialized.");
        }
    }
}
