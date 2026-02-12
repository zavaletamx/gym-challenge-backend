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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsController = void 0;
const common_1 = require("@nestjs/common");
const rankings_service_1 = require("./rankings.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let RankingsController = class RankingsController {
    rankingsService;
    constructor(rankingsService) {
        this.rankingsService = rankingsService;
    }
    getDaily() {
        return this.rankingsService.getDaily();
    }
    getYearly() {
        return this.rankingsService.getYearly();
    }
};
exports.RankingsController = RankingsController;
__decorate([
    (0, common_1.Get)('daily'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "getDaily", null);
__decorate([
    (0, common_1.Get)('yearly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "getYearly", null);
exports.RankingsController = RankingsController = __decorate([
    (0, common_1.Controller)('rankings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rankings_service_1.RankingsService])
], RankingsController);
//# sourceMappingURL=rankings.controller.js.map