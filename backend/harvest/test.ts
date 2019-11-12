var regions = require('country-data').regions;
var lookup = require('country-data').lookup;
// Match a value (grab first from array)


class test {
    init() {
         var france = lookup.countries({ name: 'Jordan' })[0].alpha2
        console.log(france)
         console.log(Object.values(regions).filter((regions:any) => regions.countries.indexOf(france)  >=0)[0]);

       // 

    }
    traverse(o: any, fn: (obj: any, prop: string, value: any) => void) {
        for (const i in o) {
            fn.apply(this, [o, i, o[i]]);
            if (o[i] !== null && typeof (o[i]) === 'object') {
                this.traverse(o[i], fn);
            }
        }
    }
}

new test().init();