package com.backend.printmedianenterprise.Services.Setting;

import com.backend.printmedianenterprise.Dto.MasterSettingDto;
import com.backend.printmedianenterprise.Entity.MasterSetting;

public interface SettingService {

    MasterSetting getMasterSetting();

    MasterSetting updateMasterSetting(MasterSettingDto masterSettingDto);
}
