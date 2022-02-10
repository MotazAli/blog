
import { CreateThumbDto } from "../dto/create-thumb.dto";
import { UpdateThumbDto } from "../dto/update-thumb.dto";
import { Thumb } from "../schemas/thumb.schema";

export abstract class IThumbService{
    abstract addThumb(createThumbDto : CreateThumbDto): Promise<Thumb> ;
    //abstract updateThumb(id :string ,updateThumbDto : UpdateThumbDto):  Promise<Thumb> ;
    abstract deleteThumb(id:string): Promise<Boolean>;
    abstract findOne(id:string):  Promise<Thumb>;
    abstract findAll(): Promise<Thumb[]>;
}