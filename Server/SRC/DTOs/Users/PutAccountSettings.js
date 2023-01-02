const {DTOFactory} = require('../DTOFactory')

class PutAccountSettingsDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const accountSettings = {
            username: data.username,
            name: data.name,
            password: data.password,
            email: data.email
        }
        return accountSettings
    }

    static getInstance() {
        if(!PutAccountSettingsDTO) {
            PutAccountSettingsDTO = new PutAccountSettingsDTOFactory()
        }

        return PutAccountSettingsDTO
    }
}

const PutAccountSettingsDTO = new PutAccountSettingsDTOFactory()

module.exports = {PutAccountSettingsDTO}