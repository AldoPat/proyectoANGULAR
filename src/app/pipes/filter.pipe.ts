import { Pipe, PipeTransform } from "@angular/core";
import { filter } from "rxjs/operators";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, arg: any): any {
        if (arg === "" || arg.length < 3) return value;
        const resultPosts = [];
        for (const post of value) {
            if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                // console.log('SIp');
                resultPosts.push(post);
            } else if (post.surname.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                resultPosts.push(post);
            } else if (post.email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                resultPosts.push(post);
            } else if (post.role.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                resultPosts.push(post);
            }
        };
        return resultPosts;
    }

    // artist(value: any, arg: any): any {
    //     if (arg === "" || arg.length < 3) return value;
    //     const resultPosts = [];
    //     for (const post of value) {
    //         if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //             // console.log('SIp');
    //             resultPosts.push(post);
    //         }
    //         // else if (post.surname.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //         //     resultPosts.push(post);
    //         // } else if (post.email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //         //     resultPosts.push(post);
    //         // } else if (post.role.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //         //     resultPosts.push(post);
    //         // }
    //     };
    //     return resultPosts;
    // }
}