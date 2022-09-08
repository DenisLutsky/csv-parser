import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'src/shared/decorators';

export class FilterDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public date!: string;

  @Trim()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty()
  public source!: string[];
}
