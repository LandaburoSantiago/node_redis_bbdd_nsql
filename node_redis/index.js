const redis = require('redis');
const express = require('express');
const app = express()
const port = 3000
const redisClient = redis.createClient({
    url:"redis://redis:6379"
});
app.set('port', port)


const connectRedis = async () =>{
    try {
        await redisClient.connect().then()
        console.log("conectado a redis")
    } catch (error) {
        console.log("error al conectarse a redis")
    }

    await redisClient.on("connect", ()=>{
        console.log("conectado a redis")
    })
    .on("error", (error)=>{
        console.log("Ha ocurrido un error: " + error)
    })
    .on("reconnecting", ()=>{
        console.log("reconectando...")
    })
    
}

connectRedis()

const setData = async ()=>{
    try {    
        await redisClient.set("key1", "Hola mundo 1")
        await redisClient.set("key2", "Hola mundo 2")
        await redisClient.set("key3", "Hola mundo 3")
    } catch (error) {
        console.log("error al insertar los datos")
    }

}
const getData = async ()=>{
    console.log(await redisClient.get("key1"));
    console.log(await redisClient.get("key2"));
    console.log(await redisClient.get("key3"));
}
//Otra alternativa
// redisClient.get("key1").then((data)=>{
// console.log(data)
// })

const setList = async ()=>{
    try {
        await redisClient.lPush("list1", ["val1", "val2", "val3", "val4"])
    } catch (error) {
        console.log("error al crear la lista")
    }
}
const getList= async ()=>{
    try {
        console.log(await redisClient.LRANGE("list1", 0, -1));
    } catch (error) {
        console.log("error al obtener la lista" + error)
    }
}

const main = async ()=>{
    await setData();
    console.log("------------------------------------")
    await setData();
    await getData()
    
    await setList();
    console.log("------------------------------------")
    await setList();
    await getList();

}

main()

app.listen(app.get('port'), (err)=>{
    console.log(`Server corriendo en el puerto ${port}`)
})

