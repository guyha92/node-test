const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
const fileName = myArgs[0]
if (fileName.indexOf('.tsv') < 0) {
    throw 'supporting only .tsv files, ensure you use tsv and .tsv exists in the file name'
}
var data = require("fs").readFileSync(myArgs[0], "utf8")

const lines = data.split("\r\n")
const res = {}
for (var i=0;i<lines.length;i++) {
    cols = lines[i].split("\t")
    if (cols[0] !== 'key') {
        res[cols[0]] = cols[1]
    }
}
console.log(res)

const appKey = myArgs[1]
if (appKey) {
    const instanceId = myArgs[2]
    console.log('preparing curl for app key ' + appKey + ' instance id ' + instanceId)
    const curl = `
    curl --location --request PUT 'widgetsrepository.us-east-1.yotpo.xyz/v1/${appKey}/widget_instances/${instanceId}' \
    --header 'Content-Type: application/json' \
    --data-raw '{
	    "instance": {
		    "widget_instance_id": ${instanceId},
            "customizations": ${JSON.stringify(res, null, 2)}
	    },
        "partial_update": true
    }'
    `

    console.log()
    console.log()
    console.log(curl)
    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(curl); proc.stdin.end();
    console.log()
    console.log()
    console.log('curl copied to clipboard!')
}
