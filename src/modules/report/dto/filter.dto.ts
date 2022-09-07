import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'src/shared/decorators';

export class FilterDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  public date!: string;

  @Trim()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  public source!: string[];
}
