import 'dotenv/config'
import express from 'express'

const app= express()
const port=process.env.PORT||3000

app.use(express.json())

let teaData=[]
let nextId=1
//add new tea
app.post('/teas',(req,res)=>{
    const {name,price}=req.body

    const newTea = {id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)

}
)
//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})
//get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    //this is the business logic
    if(!tea)
    {
        return res.status(404).send('Tea Not Found')
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)

})

app.delete('/teas/:id',(req,res)=>
{
    const index = teaData.findIndex(t=> t.id===parseInt(req.params.id))
    if(index===-1)
    {
        return res.status(404).send('Tea Not Found')
    }
    teaData.splice(index,1)
    res.status(204).send('Tea deleted')
})





app.listen(port,()=>{
    console.log(`Server is running at port: ${port}...`)
})