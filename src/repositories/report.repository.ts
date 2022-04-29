import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { report, ReportDocument } from "../entities";
import { BaseRepository } from "./base.repository";
import { Model } from 'mongoose';

@Injectable()
export class ReportRepository extends BaseRepository<report>
{
    constructor(@InjectModel(report.name) report: Model<ReportDocument>)
    {
        super(report);
    }
}