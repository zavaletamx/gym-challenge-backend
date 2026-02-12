"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinsController = void 0;
const common_1 = require("@nestjs/common");
const checkins_service_1 = require("./checkins.service");
const create_checkin_dto_1 = require("./dto/create-checkin.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const types_1 = require("../common/types");
let CheckinsController = class CheckinsController {
    checkinsService;
    constructor(checkinsService) {
        this.checkinsService = checkinsService;
    }
    create(req, file, createCheckinDto) {
        return this.checkinsService.create(req.user.id, file, createCheckinDto);
    }
    findAll(query) {
        return this.checkinsService.findAll(query);
    }
    findOne(id) {
        return this.checkinsService.findOne(id);
    }
    remove(id, req) {
        const isAdmin = req.user.role === types_1.Role.ADMIN;
        return this.checkinsService.remove(id, req.user.id, isAdmin);
    }
};
exports.CheckinsController = CheckinsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_checkin_dto_1.CreateCheckinDto]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CheckinsController.prototype, "remove", null);
exports.CheckinsController = CheckinsController = __decorate([
    (0, common_1.Controller)('checkins'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [checkins_service_1.CheckinsService])
], CheckinsController);
//# sourceMappingURL=checkins.controller.js.map