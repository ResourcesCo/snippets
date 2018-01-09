# Openwhisk

## Setup

[Vagrant instructions](https://github.com/apache/incubator-openwhisk/tree/master/tools/vagrant)

``` bash
git clone --depth=1 https://github.com/apache/incubator-openwhisk.git openwhisk
cd openwhisk/tools/vagrant
```

Then bring vagrant up (this takes a long time):

``` bash
vagrant up
```

Once it's up, ssh into the box:

``` bash
vagrant ssh
```

## Hello World

``` bash
vi helloworld.js
```

``` js
function main() {
  message = "Hello World"
  return {message}
}
```

``` bash
wsk action create helloworld helloworld.js
wsk action invoke --blocking helloworld
```

This will output something like:

``` bash
{
    "activationId": "b9a4fd3253ad43fca4fd3253ad23fc80",
    "annotations": [
        {
            "key": "path",
            "value": "guest/helloworld"
        },
        {
            "key": "waitTime",
            "value": 70
        },
        {
            "key": "kind",
            "value": "nodejs:6"
        },
        {
            "key": "limits",
            "value": {
                "logs": 10,
                "memory": 256,
                "timeout": 60000
            }
        },
        {
            "key": "initTime",
            "value": 73
        }
    ],
    "duration": 140,
    "end": 1515476878314,
    "logs": [],
    "name": "helloworld",
    "namespace": "guest",
    "publish": false,
    "response": {
        "result": {
            "message": "Hello World"
        },
        "status": "success",
        "success": true
    },
    "start": 1515476878174,
    "subject": "guest",
    "version": "0.0.2"
}
```

To run it non-blocking and get the result:

``` bash
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action invoke helloworld
ok: invoked /guest/helloworld with id 76a052d557954d4ca052d557954d4c36
vagrant@vagrant-ubuntu-trusty-64:~$ wsk activation result 76a052d557954d4ca052d557954d4c36
{
    "message": "Hello World"
}
```

Modifying it to take a parameter:

``` bash
vi helloworld.js
```

``` js
function main({name}) {
  message = `Hello ${name}`
  return {message}
}
```

``` bash
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action update hellworld helloworld.js 
ok: updated action hellworld
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action update helloworld helloworld.js 
ok: updated action helloworld
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action invoke helloworld
ok: invoked /guest/helloworld with id cc22b01725024e4ea2b01725021e4ea8
vagrant@vagrant-ubuntu-trusty-64:~$ wsk activation result cc22b01725024e4ea2b01725021e4ea8
{
    "message": "Hello undefined"
}
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action invoke helloworld --param name Jack
ok: invoked /guest/helloworld with id 20e7121db3f54301a7121db3f5c30198
vagrant@vagrant-ubuntu-trusty-64:~$ wsk activation result 20e7121db3f54301a7121db3f5c30198
{
    "message": "Hello Jack"
}
```

Setting a default param:

``` bash
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action update helloworld --param name World
ok: updated action helloworld
vagrant@vagrant-ubuntu-trusty-64:~$ wsk action invoke helloworld
ok: invoked /guest/helloworld with id 355a83ccb850471b9a83ccb850671b18
vagrant@vagrant-ubuntu-trusty-64:~$ wsk activation result 355a83ccb850471b9a83ccb850671b18
{
    "message": "Hello World"
}
```