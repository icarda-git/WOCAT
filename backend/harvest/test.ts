import jsonData from './data.json'

class test {
    init() {
        let finalObj: any = {}
        this.traverse(jsonData, (obj: any, key: any, val: any) => {
            if (key == "value" && val && val[0] && val[0]) {
                if (val[0].key && val[0].values) {
                    finalObj[val[0].key] = val[0].values
                }
                if (Array.isArray(val)) {
                    val.forEach(element => {
                        if (element.key && element.value) {
                            if (finalObj[element.key] && !Array.isArray(finalObj[element.key]))
                                finalObj[element.key] = [finalObj[element.key]]
                            if (Array.isArray(finalObj[element.key])) {
                                if (finalObj[element.key].indexOf(element.value) === -1 && element.value)
                                    finalObj[element.key].push(element.value)
                            }else
                                finalObj[element.key] = element.value
                        }

                    });
                }
            }


        })
        console.log(finalObj);
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