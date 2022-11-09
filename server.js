const express = require('express')
const app = express()
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let users = [
    {name: 'Mykola', age: 18, id: 2231},
    {name: 'Julia', age: 23, id: 4785},
    {name: 'Andriy', age: 15, id: 9912}
]


let idUsers =[2231, 4785, 9912]


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})



app.post('/i', urlencodedParser, (req, res)=>{
    let setIdUsers = new Set(idUsers)
    if(setIdUsers.has(Number(req.body.id))){
        res.send('<h1>Такий користувач вже існує</h1>')
     
    }else{
        console.log('Додавання користувача...');
        //Проміси 
        const prom = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let user = {
                    name: req.body.name, 
                    age: Number( req.body.age), 
                    id: Number(req.body.id) 
                }
                resolve(user)
            }, 10000)
            
        })
        .then((data)=>{
            users.push(data)
            console.log('Користувача додано')
            console.log(users)
            res.redirect('/')
        })
        
        
        
        
    }
    

    
})

app.post('/res', urlencodedParser, (req, res)=>{
    //Проміси з async await
    async function findUsers(){
        try {
            console.log('Шукаєм користувача...')
            const find =  ()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        //Filter
                        let nam = users.filter((p)=> p.name == req.body.findByName)
                        resolve(nam)
                    }, 2000)
                })
            }
            let m = await find()
            if (m.length > 0) {
                console.log('Користувач знайдений');
                 console.log(m);
                 res.redirect('/')
            }else console.log("Користувача не знайдено");
            
            
        } catch (e) {
            console.log(e)
        }
    }
    findUsers()
   
})

app.post('/rah', urlencodedParser, (req, res)=>{
    //reduce
    let rest = users.reduce((total, person)=> total + person.age, 0)
    console.log(Math.round( rest/users.length) );
    res.redirect('/')
})

app.post('/visits', urlencodedParser, (req, res)=>{
    //Map
    const visits = new Map()
    for (let i = 0; i < users.length; i++) {
         visits
        .set(users[i], new Date(new Date().getTime() + `${i}000` * 60)) 
    
    }
    function detUser(user){
        return visits.get(user)
    }
 
    let nam = users.filter((p)=> p.name == req.body.time)

    console.log(detUser(nam[0]));
    res.redirect('/')
})


app.listen(3000, ()=>{
    console.log('Server started...');
})