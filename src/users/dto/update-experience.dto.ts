import { IsString, IsOptional } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  @IsOptional()
  id?: any;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}
