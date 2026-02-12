"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCheckinDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_checkin_dto_1 = require("./create-checkin.dto");
class UpdateCheckinDto extends (0, swagger_1.PartialType)(create_checkin_dto_1.CreateCheckinDto) {
}
exports.UpdateCheckinDto = UpdateCheckinDto;
//# sourceMappingURL=update-checkin.dto.js.map