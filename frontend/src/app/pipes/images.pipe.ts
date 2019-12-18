import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getFirstImage' })
export class GetFirstImage implements PipeTransform {
    transform(value: Array<string>): String {
       let url= "https://qcat.wocat.net"
        if (Array.isArray(value))
            if (Array.isArray(value[0]))
                return url+value[0][0];
            else
                return url+value[0];
        else
            return url+value;
    }
}